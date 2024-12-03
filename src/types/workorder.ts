import { z } from 'zod';
// eslint-disable-next-line import/no-unassigned-import
import 'zod-openapi/extend';

export const workorder = z.object({
    id: z.string().openapi({
        description: 'The id of the workorder.',
        example: 'CorpoServo000',
    }),
});
