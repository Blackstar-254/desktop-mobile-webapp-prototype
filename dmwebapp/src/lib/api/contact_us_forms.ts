import { z } from 'zod';

export const contactUsFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  message: z.string().optional(),
  boundaryId: z
    .string()
    .regex(/[0-9a-zA-Z]+/)
    .optional(),
  valid: z.boolean(),
});

export function ReadFormData(
  raw_data: string,
): Record<string, string | boolean> & { valid: boolean } {
  const formId = {
    boundaryId: '',
    valid: true,
  };
  if (!raw_data.includes('Content-Disposition: form-data')) {
    formId.valid = false;
    return formId;
  }

  const trim_data = raw_data
    .split('\r\n')
    .filter((v) => v.trim())
    .join(' ');

  const data = trim_data

    .split('--')
    .filter((v) => v.trim())
    .map((v) => {
      return v.trim();
    });

  let message: Record<string, string> & { valid?: boolean } = {};

  data.map((v, i) => {
    if (!formId.valid) {
      return;
    }

    const wbkit_boundary: RegExpMatchArray | null | string = v.match(
      /WebKitFormBoundary([0-9A-Za-z]+)/,
    );
    if (!wbkit_boundary) {
      return;
    }
    if (i < 1) {
      formId.boundaryId = wbkit_boundary[1] as unknown as string;
    } else {
      if (formId.boundaryId !== (wbkit_boundary[1] as unknown as string)) {
        formId.valid = false;
        return;
      }
    }

    let key_val: RegExpMatchArray | null | string = v.match(
      /name="([a-zA-Z0-9]+)" (.*)/,
    );
    if (!key_val) {
      return;
    }
    const key = key_val[1] as unknown as string;
    const val = key_val[2] as unknown as string;
    message[key] = val;
  });

  if (!formId.valid) {
    return formId;
  }

  // console.log({
  //   data,
  //   message,
  // });
  return {
    ...formId,
    ...message,
  };
}
