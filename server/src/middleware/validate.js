import { object } from 'yup'

export const validate = schema => (req, res, next) => {
  try {
    const obj = {
      ...req.body,
      ...req.params,
      ...req.query,
    }

    const value = object(schema).noUnknown().validateSync(obj, {
      abortEarly: false,
      stripUnknown: false,
    })

    Object.assign(req, value)
    return next()
  } catch (err) {
    console.log({ err: err.name, errors: err.errors })
    return res.status(400).json({
      code: 400,
      name: err.name,
      error: err.errors,
    })
  }
}
