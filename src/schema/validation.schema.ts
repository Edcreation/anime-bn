import Joi from 'joi';

function errorMessage(word: string) {
    const obj = {
      'string.base': `${word} is Invalid`,
      'string.empty': `${word} cannot be an empty field`,
      'string.min': `${word} should have at least {#limit} characters`,
      'any.required': `${word} is required `,
      'any.invalid': `${word} is Invalid`,
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': `${word} must have 8 characters, Uppercase and Lowercase, a number and a Symbol`,
    };
    return obj;
}

const usernameSchema = Joi.string()
  .min(6)
  .max(30)
  .required()
  .messages(errorMessage('Username'));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage('Email'));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
  )
  .messages(errorMessage('Password'));

const LoginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const SignUpSchema = Joi.object().keys({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const CommentSchema = Joi.object().keys({
  comment: Joi.string().required().max(800).messages(errorMessage('Comment'))
})

export default { SignUpSchema, LoginSchema, CommentSchema }