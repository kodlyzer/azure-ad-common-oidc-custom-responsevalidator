// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { JsonService } from './JsonService';
import { MetadataService } from './MetadataService';
import { Log } from './Log';

export class UserInfoService {
    _settings: any;
    _jsonService: JsonService;
    _metadataService: any;
    constructor(settings, JsonServiceCtor = JsonService, MetadataServiceCtor = MetadataService) {
        if (!settings) {
            Log.error('UserInfoService.ctor: No settings passed');
            throw new Error('settings');
        }

        this._settings = settings;
        this._jsonService = new JsonServiceCtor();
        this._metadataService = new MetadataServiceCtor(this._settings);
    }

    getClaims(token) {
        if (!token) {
            Log.error('UserInfoService.getClaims: No token passed');
            return Promise.reject(new Error('A token is required'));
        }

        return this._metadataService.getUserInfoEndpoint().then((url) => {
            Log.debug('UserInfoService.getClaims: received userinfo url', url);

            return this._jsonService.getJson(url, token).then((claims) => {
                Log.debug('UserInfoService.getClaims: claims received', claims);
                return claims;
            });
        });
    }
}
