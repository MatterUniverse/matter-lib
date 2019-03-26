import * as bitcoinfiles from 'bitcoinfiles-sdk';
import { FileData } from './models/file-data.interface';

function mapPrefix(): string {
    return '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5';
}

const defaultOptions = {
    bitdb_api_base: 'https://babel.bitdb.network/q/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/',
    bitdb_api_key: '12cHytySdrQGRtuvvkVde2j3e74rmEn5TM',
    bitcoinfiles_api_base: 'https://media.bitcoinfiles.org',
}

/**
 * Client provides abilities to create and get bitcoinfiles
 */
export class Client {
    options = defaultOptions;
    constructor(options: any) {
        this.options = Object.assign({}, this.options, options);
    }
    /**
     * Resolve a promise and/or invoke a callback
     * @param resolveOrReject Resolve or reject function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    private callbackAndResolve(resolveOrReject: Function, data: any, callback?: Function) {
        if (callback) {
            callback(data);
        }
        if (resolveOrReject) {
            return resolveOrReject(data)
        }
    }
    /**
     *
     * @param request create request
     * @param callback Optional callback to invoke after completed
     */
    async createPost(request: { file: FileData, pay: { key: string }, identity: { key: string } }, callback?: Function): Promise<any> {
        if (!request.identity || !request.identity.key || request.identity.key === '') {
            return new Promise((resolve) => {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'identity key required'
                }, callback);
            });
        }

        if (!request.file) {
            return new Promise((resolve) => {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'file required'
                }, callback);
            });
        }

        const bitcoinFilesRequest = Object.assign({}, request, {
            signatures: [ request.identity ],
            file: Object.assign({}, request.file, {
                name: request.file.title && request.file.title !== '' ? request.file.title : request.file.name
            })
        })
        if (!bitcoinFilesRequest.file['tags']) {
            bitcoinFilesRequest.file['tags'] = [];
        }
        let unixTime = Math.floor(Date.now() / 1000)
        bitcoinFilesRequest.file['tags'] = bitcoinFilesRequest.file['tags'].concat([
            '|',
            mapPrefix(),
            'SET',
            'type',
            'post',
            'post_id',
            '' + unixTime,
            'version',
            '0x01',
        ]);

        const buildResult = await bitcoinfiles.buildFile(bitcoinFilesRequest);
        if (!buildResult.success) {
            return new Promise((resolve) => {
                this.callbackAndResolve(resolve, {
                    success: false,
                    message: buildResult.message
                }, callback);
            });
        }
        return bitcoinfiles.createFile(bitcoinFilesRequest, callback, this.options);
    }

    /**
     *
     * @param request create request
     * @param callback Optional callback to invoke after completed
     */
    datapay(request: { data: any[], pay: { key: string }}, callback?: Function): Promise<any> {
        return bitcoinfiles.datapay(request, callback, this.options);
    }

    /**
     * Builds the file and returns the parameters to send to datapay
     *
     * @param request create request
     * @param callback Optional callback to invoke after completed
     */
    async buildPost(request: { file: FileData, identity: { key: string } }, callback?: Function): Promise<any> {
        if (!request.identity || !request.identity.key || request.identity.key === '') {
            return new Promise((resolve) => {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'identity key required'
                }, callback);
            });
        }

        if (!request.file) {
            return new Promise((resolve) => {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'file required'
                }, callback);
            });
        }

        const bitcoinFilesRequest = Object.assign({}, request, {
            signatures: [ request.identity ],
            file: Object.assign({}, request.file, {
                name: request.file.title && request.file.title !== '' ? request.file.title : request.file.name
            })
        })
        if (!bitcoinFilesRequest.file['tags']) {
            bitcoinFilesRequest.file['tags'] = [];
        }
        let linkId = Math.floor(Date.now() / 1000) + '';
        if (request.file['postLinkId'] && !/^\s+$/.test(request.file['postLinkId'])) {
            linkId = request.file['postLinkId'];
        }
        bitcoinFilesRequest.file['tags'] = bitcoinFilesRequest.file['tags'].concat([
            '|',
            mapPrefix(),
            'SET',
            'type',
            'post',
            'post_id',
            linkId,
            'version',
            '0x01',
        ]);
        const buildResult = await bitcoinfiles.buildFile(bitcoinFilesRequest);
        if (!buildResult.success) {
            return new Promise((resolve) => {
                this.callbackAndResolve(resolve, {
                    success: false,
                    message: buildResult.message
                }, callback);
            });
        }
        return buildResult;
    }

    /**
     * Get a file by txid
     * @param txid txid of file
     * @param callback Optional callback to invoke after completed
     */
    getPost(txid: string, callback?: Function): Promise<any> {
        return bitcoinfiles.get(txid, callback, this.options);
    }
    /**
     * Find posts matching criteria
     * @param request find request
     * @param callback Optional callback to invoke after completed
     */
    findPost(request: {
        address?: string,
        contentType?: string,
        name?: string,
        tags?: string[],
        skip?: number,
        limit?: number,
        sort?: -1 | 1,
        debug?: boolean,
        sortField?: string
    }, callback?: Function): Promise<any> {
        return bitcoinfiles.find(request, callback, this.options);
    }
}