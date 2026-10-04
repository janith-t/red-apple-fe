import { useCallback, useState } from "react";
import { isAxiosError } from "axios";
import apiClient from "@/utils/api-client";
import { normalizeError } from "@/utils/error-utils";
import type { QueryParams } from "@/types/api";

interface PdfRequest {
  endpoint: string;
  params?: QueryParams;
  filename?: string;
}

const filenameFromHeader = (header?: string): string | undefined =>
  header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)?.[1];

// With responseType "blob", error JSON also arrives as a Blob, so read it back before normalising.
const readBlobError = async (error: unknown): Promise<string> => {
  if (isAxiosError(error) && error.response?.data instanceof Blob) {
    try {
      const body = JSON.parse(await error.response.data.text());
      if (body?.message) return body.message as string;
    } catch {
      // not JSON, fall through
    }
  }
  return normalizeError(error, "Could not load the PDF.").message;
};

const usePdf = () => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const fetchPdf = useCallback(async ({ endpoint, params }: PdfRequest) => {
    const response = await apiClient.get<Blob>(endpoint, { params, responseType: "blob" });
    return {
      blob: new Blob([response.data], { type: "application/pdf" }),
      filename: filenameFromHeader(response.headers["content-disposition"] as string | undefined),
    };
  }, []);

  const downloadPdf = useCallback(
    async (request: PdfRequest) => {
      setPdfLoading(true);
      setPdfError(null);
      try {
        const { blob, filename } = await fetchPdf(request);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = request.filename ?? filename ?? "document.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } catch (error) {
        setPdfError(await readBlobError(error));
      } finally {
        setPdfLoading(false);
      }
    },
    [fetchPdf],
  );

  // The tab is opened synchronously on click (before the request) so popup blockers allow it.
  const openPdfInNewTab = useCallback(
    async (request: PdfRequest) => {
      const tab = window.open("", "_blank");
      if (!tab) {
        setPdfError("Your browser blocked the new tab. Allow pop-ups for this site and try again.");
        return;
      }
      setPdfLoading(true);
      setPdfError(null);
      try {
        const { blob } = await fetchPdf(request);
        const url = URL.createObjectURL(blob);
        tab.location.href = url;
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (error) {
        tab.close();
        setPdfError(await readBlobError(error));
      } finally {
        setPdfLoading(false);
      }
    },
    [fetchPdf],
  );

  const clearPdfError = useCallback(() => setPdfError(null), []);

  return { downloadPdf, openPdfInNewTab, pdfLoading, pdfError, clearPdfError };
};

export default usePdf;
