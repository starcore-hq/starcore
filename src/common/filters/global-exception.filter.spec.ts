import { GlobalExceptionFilter } from './global-exception.filter';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: any;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockRequest = { url: '/test', method: 'GET' };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should handle HttpException with correct status', () => {
    const exception = new HttpException('Not found', HttpStatus.NOT_FOUND);
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('should return 500 for unknown exceptions', () => {
    filter.catch(new Error('Unknown'), mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it('should include timestamp in response', () => {
    const exception = new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    filter.catch(exception, mockHost);
    const jsonCall = mockResponse.json.mock.calls[0][0];
    expect(jsonCall.timestamp).toBeDefined();
  });

  it('should include path in response', () => {
    const exception = new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    filter.catch(exception, mockHost);
    const jsonCall = mockResponse.json.mock.calls[0][0];
    expect(jsonCall.path).toBe('/test');
  });
});