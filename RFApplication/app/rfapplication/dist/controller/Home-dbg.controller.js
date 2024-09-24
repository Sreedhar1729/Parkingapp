sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.app.rfapplication.controller.Home", {
        onInit: function () {
            var oModel = new sap.ui.model.odata.v2.ODataModel("/v2/RFApplicationSRV/");
            this.getView().setModel(oModel);
        },
        
        /** Fragment Loading in Async form for creation */
        handleLinksapPress: async function () {
            this.oConnectSap ??= await this.loadFragment({
                name: "com.app.rfapplication.fragments.ConnecttoSAP"
            });
            this.oConnectSap.open();
        },

        /** Finish */
        onFinishconnectSAPPress: function () {
            // Get the dialog and its input fields
            var sDescription = this.byId("idDescriptionInput").getValue();
            var sSystemId = this.byId("idSystemIdInput").getValue();
            var sInstanceNumber = this.byId("idInstanceNumberInput").getValue();
            var sClient = this.byId("idClientInput").getValue();
            var sApplicationServer = this.byId("idApplicationServerInput").getValue();
            var sRouterString = this.byId("idRouterStringInput").getValue();
            var sService = this.byId("idServiceInput").getValue();

            var oModel = this.getView().getModel("ModelV2");
            var oTable= this.getView().byId("idTable");
            var that = this;

            // Input validation
            if (!sSystemId || !sInstanceNumber || !sClient) {
                MessageBox.error("Please fill in all required fields.");
                return; // Exit if validation fails
            }

            // Check existing configurations
            oModel.read("/SystemConfiguration", {
                success: function(odata) {
                    // var existingEntry = odata.results.find(item => item.systemid === sSystemId);
                    // if (existingEntry) {
                    //     MessageBox.error("A configuration with this System ID already exists.");
                    //     return; // Exit if it already exists
                    // }
                    // Proceed to create if no existing entry is found
                     createEntry();
                },
                error: function() {
                    MessageBox.error("Failed to read existing configurations.");
                }
            });

            function createEntry() {
                oModel.create("/SystemConfiguration", {
                    systemid: sSystemId,
                    InstanceNo: sInstanceNumber,
                    Client: sClient,
                    Description: sDescription,
                    ApplicationServer: sApplicationServer,
                    SapRouterString: sRouterString,
                    SapService: sService
                }, {
                    success: function(oData) {
                        MessageToast.show("Successfully created!");
                        oModel.refresh(true);
                        that.getView().byId("idTable").getBinding("items").refresh(true);
                        that.onCloseconnectsap(); // Close dialog after success
                    },
                    error: function(oError) {
                        MessageBox.error("Error creating entry: " + oError.message);
                        oModel.refresh(true);
                    }
                });
            }
        },

        /** Closing Dialog */
        onCloseconnectsap: function () {
            this.oConnectSap.close();
        },
        
        /**Deleting the record */
        onDeleteButtonPress:function(){
            debugger
            var oTable = this.getView().byId("idTable");
            var oPath=oTable.getSelectedContextPaths()[0];
            
            /**getting the model */
            var oModel = this.getView().getModel("ModelV2");
            var that = this;
            oModel.remove(oPath,{success:function(odata){
                MessageToast.show("delted");
                that.getView().byId("idTable").getBinding("items").refresh(true);
            },error:function(oError){
                MessageBox.error("Error")

            }})
        }
    });
});