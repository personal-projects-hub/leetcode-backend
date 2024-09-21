import { customAlphabet } from "nanoid";
import Resizer from "react-image-file-resizer";
import { ulid } from "ulid";

export const log = (
  message: string,
  data?: string | object | number | undefined | null
) => {
  if (data) {
    return console.log(message, data);
  }

  return console.log(message);
};

export const logError = (
  message: string | number | object,
  error?: unknown,
  showFullError: boolean = false
) => {
  let errorMessage = error instanceof Error ? error?.message : error;

  if (
    typeof errorMessage === "string" &&
    (errorMessage.includes("Unexpected string") ||
      errorMessage.includes("Unexpected token"))
  ) {
    errorMessage = "Trying to parse invalid JSON!";
  }

  // eslint-disable-next-line no-console
  return console.error(message, showFullError ? error : errorMessage);
};

export const isBase64 = (value: string) => {
  try {
    // Convert the string to a Buffer using the Base64 encoding
    const buffer = Buffer.from(value, "base64");

    // Check if the buffer can be encoded back to the original string
    const res = buffer.toString("base64") === value;

    return res;
  } catch (error) {
    return false;
  }
};

export const convertToDataUrl = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const convertToBase64 = async (file: File): Promise<string | null> => {
  const dataUrl = await convertToDataUrl(file);

  if (!dataUrl) {
    return null;
  }

  return dataUrl.split(",")[1];
};

export const isValidUlid = (value: string) => {
  const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;

  return ulidRegex.test(value.toUpperCase());
};

export const generateId = () => {
  return ulid().toLowerCase();
};

export const generateVerificationCode = () => {
  return customAlphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ", 6)();
};

export const sleep = (ms: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function extractErrorMessage(error: unknown, fallbackMessage?: string) {
  let errorMessage =
    fallbackMessage ?? "Something went wrong! Please try again.";

  try {
    if (error instanceof Error && error?.message) {
      errorMessage = error.message;
    }

    return errorMessage;
  } catch (error) {
    return errorMessage;
  }
}

export const resizeImageFile = async (
  file: File,
  options: {
    maxWidth: number;
    maxHeight: number;
    quality?: number;
    imageType?: "JPEG" | "PNG" | "WEBP";
    outputType?: "base64" | "blob" | "file";
    rotation?: number;
  }
) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      options.maxWidth,
      options.maxHeight,
      options.imageType ?? "PNG",
      options.quality ?? 100,
      options.rotation ?? 0,
      (output) => {
        resolve(output);
      },
      options.outputType ?? "base64"
    );
  }) as Promise<string | File | Blob | ProgressEvent<FileReader>>;
};

export function getRootDomain(url: string): string {
  // Remove protocol (http, https, etc.) and www
  const domain = url.replace(/(https?:\/\/)?(www\.)?/, "");

  // Split the domain into parts
  const domainParts = domain.split(".");

  // If domain parts length is less than 2, return the full domain
  if (domainParts.length < 2) {
    return domain;
  }

  // Return the last two parts of the domain
  return domainParts.slice(-2).join(".");
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
