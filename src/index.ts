
import { Client } from './client';
import { FileData } from './models/file-data.interface';

/**
 * Build a Post
 * @param request Request to create a post
 * @param callback Optional callback to invoke
 * @param options Options override
 */
export function buildPost(request: { file: FileData, identity: { key: string } }, callback?: Function, options?: any): Promise<any> {
  const client = new Client(options);
  return client.buildPost(request, callback);
}

/**
 * Create a Post
 * @param request Request to create a post
 * @param callback Optional callback to invoke
 * @param options Options override
 */
export function createPost(request: { file: FileData, pay: { key: string }, identity: { key: string } }, callback?: Function, options?: any): Promise<any> {
  const client = new Client(options);
  return client.createPost(request, callback);
}

/**
 * Datapay wrapper
 * @param request Request to datapay
 * @param callback Optional callback to invoke
 * @param options Options override
 */
export function datapay(request: { data: any[], pay: { key: string }}, callback?: Function, options?: any): Promise<any> {
  const client = new Client(options);
  return client.datapay(request, callback);
}

/**
 * Find Posts
 * @param request Request to search for Posts
 * @param callback Optional callback to invoke
 * @param options Options override
 */
export function find(request: {
  address?: string,
  contentType?: string,
  name?: string,
  tags?: string[],
  offset?: number,
  limit?: number,
  sort?: -1 | 1,
  sortField?: string
}, callback?: Function, options?: any): Promise<any> {
  const client = new Client(options);
  return client.findPost(request, callback);
}

/**
 * Get a Post by txid
 * @param txid txid of Post
 * @param callback Optional callback to invoke
 * @param options Options override
 */
export function getPost(txid: string, callback?: Function, options?: any): Promise<any> {
  const client = new Client(options);
  return client.getPost(txid, callback);
}

export default class Matter {
  options = undefined;

  constructor(options?: any) {
    if (options) {
      this.options = options;
    }
  }

  getPost(txid: string, callback?: Function): Promise<any> {
    return getPost(txid, callback, this.options);
  }
}

if (window) {
  window['Matter'] = Matter;
}