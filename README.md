The code changes we've used to achieve Azure AD common endpoint support from [oidc-client](https://github.com/IdentityModel/oidc-client-js) library in our AuthenticationService. 

The prime reason for using this is related to the [issue](https://github.com/IdentityModel/oidc-client-js/issues/724), which apparantly is a support which they can't add due to specification criteria. To support common endpoint, we've used the same [ResponseValidator](https://github.com/IdentityModel/oidc-client-js/blob/dev/src/ResponseValidator.js) v2.0 from oidc-client@1.5.4 library and made a minor tweak to be used as our custom response validator. The files that ResponseValidator depends on is also utilized.

Feel free to contribute to keep this robust

# Changes
The changes made in the source code to get things working are

Made the following change in ResponseValidator.js
```
    if(issuer.indexOf('{tenantid}') > -1) { // for azure ad common end point 
        issuer = this._joseUtil.parseJwt(response.id_token).payload.iss;
    }

```

# Usage
The Custom ResponseValidator is then used while initializing as follows
```
        const settings: UserManagerSettings = {
            .
            .
            .
            ResponseValidatorCtor: ResponseValidator 
        };
```
