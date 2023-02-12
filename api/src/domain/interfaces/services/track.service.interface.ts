export interface ITrackService {
  getAll: () => Promise<string>;

  getOne: () => Promise<string>;

  create: () => Promise<string>;

  delete: () => Promise<string>;
}
