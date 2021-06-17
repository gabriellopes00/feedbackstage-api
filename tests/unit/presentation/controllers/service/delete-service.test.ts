import { UnauthorizedMaintainerError } from '@/domain/service/errors/unauthorized-maintainer'
import { UnregisteredApiKeyError } from '@/domain/service/errors/unregistered-api-key'
import {
  DeleteServiceController,
  DeleteServiceParams
} from '@/presentation/controllers/service/delete-service'
import {
  badRequest,
  conflict,
  noContent,
  serverError,
  unauthorized
} from '@/presentation/helpers/http'
import { MockValidator } from '@t/mocks/common/validator'
import { MockDeleteService } from '@t/mocks/service/delete-service'
import { fakeService } from '@t/mocks/service/service'
import { fakeUser } from '@t/mocks/user/user'

describe('Delete Service Controller', () => {
  const mockValidator = new MockValidator() as jest.Mocked<MockValidator>
  const mockDeleteService = new MockDeleteService() as jest.Mocked<MockDeleteService>
  const sut = new DeleteServiceController(mockValidator, mockDeleteService)
  const fakeParams: DeleteServiceParams = { apiKey: fakeService.apiKey, userId: fakeUser.id }

  describe('Validation', () => {
    it('Should call validator before call deleteService usecase', async () => {
      const validate = jest.spyOn(mockValidator, 'validate')
      const del = jest.spyOn(mockDeleteService, 'delete')
      await sut.handle(fakeParams)

      expect(validate).toHaveBeenCalledWith(fakeParams)

      const validateCall = validate.mock.invocationCallOrder[0]
      const delCall = del.mock.invocationCallOrder[0]
      expect(validateCall).toBeLessThan(delCall)
    })

    it('Should return an 400 response if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(badRequest(new Error()))
    })

    it('Should return a 500 response if validation throws', async () => {
      mockValidator.validate.mockImplementationOnce(() => {
        throw new Error()
      })
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })

  describe('DeleteService Usecase', () => {
    it('Should not call addService usecase if validation fails', async () => {
      mockValidator.validate.mockReturnValueOnce(new Error())
      const del = jest.spyOn(mockDeleteService, 'delete')
      await sut.handle(fakeParams)
      expect(del).not.toHaveBeenCalled()
    })

    it('Should return 409 if receive an unregistered apiKey', async () => {
      mockDeleteService.delete.mockResolvedValueOnce(new UnregisteredApiKeyError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(conflict(new UnregisteredApiKeyError('')))
    })

    it('Should return 401 if receive request from invalid maintainer', async () => {
      mockDeleteService.delete.mockResolvedValueOnce(new UnauthorizedMaintainerError(''))
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(unauthorized(new UnauthorizedMaintainerError('')))
    })

    it('Should return 204 on success', async () => {
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(noContent())
    })

    it('Should return a 500 response if addService throws', async () => {
      mockDeleteService.delete.mockRejectedValueOnce(new Error())
      const response = await sut.handle(fakeParams)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})