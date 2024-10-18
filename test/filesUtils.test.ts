import fs from 'fs/promises';
import { readJsonFile, writeJsonFile } from '../src/services/courseService';

jest.mock('fs/promises');

describe('File Utils', () => {
  const testFilePath = '/path/to/test.json';
  const mockData = [{ id: 1, title: 'Test Course' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('readJsonFile should read and parse JSON file correctly', async () => {
    // Mock fs.readFile
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const data = await readJsonFile(testFilePath);
    expect(data).toEqual(mockData);
    expect(fs.readFile).toHaveBeenCalledWith(testFilePath, 'utf-8');
  });

  test('writeJsonFile should write data to JSON file', async () => {
    // Mock fs.writeFile
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

    await writeJsonFile(testFilePath, mockData);
    expect(fs.writeFile).toHaveBeenCalledWith(
      testFilePath,
      JSON.stringify(mockData, null, 2),
      'utf-8'
    );
  });
});