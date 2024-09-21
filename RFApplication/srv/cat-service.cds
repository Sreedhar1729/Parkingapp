using RFApplication.db as my from '../db/schema';

@path: '/RFApplicationSRV'
define service MyService {
    define entity SystemConfiguration as projection on my.SystemConfiguration;
}
