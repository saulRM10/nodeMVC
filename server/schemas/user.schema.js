const { z } = require("zod");

const userSchema = z.object({
  id: z.number(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  group_id: z.number(),
  language_id: z.number(),
  picture: z.string().url().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

const usersSchema = z.array(userSchema);

const userNotFoundSchema = z.object({
  message: z.string(),
  isSigningUp: z.boolean(),
});

const userErrorMessageSchema = z.object({
  message: z.string(),
});

module.exports = {
  userSchema,
  userNotFoundSchema,
  usersSchema,
  userErrorMessageSchema,
};
