
		const API_publicKey = "FLWPUBK-d441b30911dcff6a116ec09c08abfd8e-X";
		
		
	function payWithRave(){
		var x = getpaidSetup({
			
			PBFPubkey: API_publicKey,
			customer_email: "user@example.com",
			amount: 1000,
			customer_phone: "2348123456789",
			currency: "NGN",
			txref: "noma_9411",
			meta:[{metaName: "flightID",
		          metaValue:"AP1234"}],
							 
			onclose: function(){},
			callback: function(response){
				var txref = response.tx.txRef;
				
				console.log("this is the response returned after a charge",response);
				
				if(response.tx.chargeResponseCode == "00" ||response.tx.chargeResponseCode =="0"){
					//redirect to a success page
					document.getElementById("myBtn").disabled = false;
					
				}else{
					//redirect to a failure page
					document.getElementById("myBtn").disabled = true;
				}
				
				x.close(); //to close the modal immediately after payment
			}
							 
			
		});
	}
	
	
	