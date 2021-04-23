import { Request, Response } from 'express'
import { Controller } from '@/presentation/ports/controllers'

export const routerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const data = { ...req.body }
    const response = await controller.handle(data)

    if (response.code >= 200 && response.code <= 299) res.status(response.code).json(response.body)
    else res.status(response.code).json({ error: response.body.message })
  }
}