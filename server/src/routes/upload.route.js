import { Router } from 'express'
import { auth, upload, uploadStorage } from '../middlewares'
import { uploadController } from '../controllers'

const router = new Router()

router.post(
  '/avatar',
  auth(),
  uploadStorage.single('avatar'),
  upload,
  uploadController.uploadAvatar
)

router.post(
  '/cover_photo',
  auth(),
  uploadStorage.single('coverPhoto'),
  upload,
  uploadController.uploadCoverPhoto
)

export default router
