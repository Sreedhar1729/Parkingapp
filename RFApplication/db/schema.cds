namespace RFApplication.db;

/** Define the Entity for storing credentials */

define entity SystemConfiguration {
    key systemid          : String;
    key InstanceNo        : String;
    key Client            : String;
        Description       : String;
        ApplicationServer : String;
        SapRouterString   : String;
        SapService        : String;
}
