namespace RFApplication.db;

/** Define the Entity for storing credentials */

define entity SystemConfiguration {
    key systemid          : Integer;
    key InstanceNo        : Integer;
    key Client            : Integer;
        Description       : String;
        ApplicationServer : String;
        SapRouterString   : String;
        SapService        : String;
}
