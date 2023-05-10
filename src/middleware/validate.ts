import { RESPONSE } from '../types'

export function validate(schema: any) {
    return (req: any, res: any, next: any) => {
      const Validate = schema.validate(req.body);
      if (Validate.error) {
        res.status(406).send({
          code: 406,
          message: 'Validation Error',
          error: Validate.error.message,
        }as RESPONSE);
      } else {
        next();
      }
    };
}

export function validateUUID(schema: any) {
    return (req: any, res: any, next: any) => {
      const Validate = schema.validate(req.params);
  
      if (Validate.error) {
        res.status(406).send({
          code: 406,
          error: Validate.error.message,
        });
      } else {
        next();
      }
    };
  }