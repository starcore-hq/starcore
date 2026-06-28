import { PaginationDto, paginate } from './pagination.dto';

describe('PaginationDto', () => {
  it('should have default page 1', () => {
    const dto = new PaginationDto();
    expect(dto.page).toBe(1);
  });

  it('should have default limit 20', () => {
    const dto = new PaginationDto();
    expect(dto.limit).toBe(20);
  });

  it('should calculate skip correctly', () => {
    const dto = new PaginationDto();
    dto.page = 3;
    dto.limit = 10;
    expect(dto.skip).toBe(20);
  });
});

describe('paginate()', () => {
  it('should return correct shape', () => {
    const dto = new PaginationDto();
    const result = paginate(['a', 'b'], 10, dto);
    expect(result.data).toEqual(['a', 'b']);
    expect(result.total).toBe(10);
    expect(result.totalPages).toBe(1);
  });

  it('should calculate totalPages correctly', () => {
    const dto = new PaginationDto();
    dto.limit = 10;
    const result = paginate([], 45, dto);
    expect(result.totalPages).toBe(5);
  });
});