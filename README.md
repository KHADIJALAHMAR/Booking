### Routes: 
- adminRoutes / ownerRoutes / customerRoutes / hotelRoutes / bookingRoutes / roomRoutes / reviewRoutes / authentificationRoutes
-----------------------------------------------------------------------------------------------------------------
### - authentificationRoutes : 
	_ post("/auth/register") 			// Users.handleRegister
	_ post("/auth/login")			        // Users.handleLogin

### - ownerRoutes : 
	_ get("/owners/accepted") 			// access only by admin  				Owners.getAcceptedOwners
	_ get("/owners/refused") 			// access only by admin					Owners.getRefusedOwners
	_ get("/owners/banned") 			// access only by admin					Owners.getBannedOwners
	_ post("/owners/room")			        // access only by owner					Owners.createRoom
	_ put("/owners/room/:roomId") 		        // access only by owner(give it hotelId)		Owners.updateRoom
	_ delete("/owners/room/:roomId") 		// access only by owner(give it hotelId)		Owners.deleteRoom
	_ put("/owners/booking/accept")		        // access only by owner(give it bookingId)		Owners.acceptBooking
	_ put("/owners/booking/refuse") 		// access only by owner(give it bookingId)		Owners.refuseBooking


### - adminRoutes :
	_ put("admin/owner/accept") 		// access only by admin(give it ownerId)		Admins.acceptOwner
	_ put("admin/owner/refuse") 		// access only by admin(give it ownerId)		Admins.refuseOwner
	_ put("admin/owner/ban") 		// access only by admin(give it ownerId)		Admins.banOwner
	_ put("admin/owner/unban") 		// access only by admin(give it ownerId)		Admins.unbanOwner
	_ put("admin/customer/ban") 		// access only by admin(give it customerId)		Admins.banCustomer
	_ put("admin/customer/unban") 		// access only by admin(give it customerId)		Admins.unbanCustomer
	_ put("/admin/hotel/accept") 		// access only by admin (give it hotelId)		Admins.acceptHotel
	_ put("/admin/hotel/refuse") 		// access only by admin (give it hotelId)		Admins.refuseHotel
	
### - customerRoutes : 
	_ get("/customers/banned") 		          // access only by admin					                Admins.getBannedCustomers
	_ get("/customers")			                // access by everyone				                  	Customers.getCustomers
	_ post("/customers/booking") 	      	  // add a booking access				                	Customers.createBooking
	_ put("/customers/booking/:bookingId")	// access only by customer			               	Customers.updateBooking
	_ put("/customers/booking/pay")	      	// include giving the payment mode as request		Customers.payBooking
	   
### - hotelRoutes : 
	_ post("/hotels") 			                // add an hotel access only by owner	          Owners.createHotel	
	_ get("/hotels") 		                  	// access by everyone			                      Hotels.getHotels
	_ get("/hotels/accepted") 		          // access by admin			                        Admins.getAcceptedHotels
	_ get("/hotels/refused") 	            	// access by admin			                        Admins.getRefusededHotels
	_ put("/hotels/:hotelId") 	           	// access only by owner			                    Owners.updateHotel
	_ delete("/hotels/:hotelId") 	        	// access only by owner			                    Owners.deleteHotel
	_ post("/hotels/filterByName") 	        // access by everyone			                      Hotels.getHotelsByName
	_ post("/hotels/filterByCity") 	        // access by everyone			                      Hotels.getHotelsByCity
	_ post("/hotels/filterByStars") 	      // access by everyone			                      Hotels.getHotelsByStars
	_ delete("/hotels/delete") 	           	// access only by AD and OW (give it hotelId) 	Hotels.deleteHotel

### - roomRoutes :	
	_ get("/rooms") 			// access by everyone give it hotelId		Rooms.getRooms
	_ post("/rooms/filterByPrice") 		// access by everyone give hotelId		Rooms.getRoomsByPrice		
	

### - bookingRoutes :
	_ get("/bookings")		        	// access by owners					                                   	 Bookings.getBookings
	_ delete("/bookings/delete") 		// access only by owner and the booking's owner (customer)       Bookings.deleteBooking
