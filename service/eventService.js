angular.module("p3").service("eventService", function(){
    var data = {
        "events": [
                {
                "title": "Event 2223!",
                "username": "u6",                
                "questions": [
                    {
                        "text": "skjdhskahdaksdj",
                        "username": "u1"
                    },
                    {
                        "text": "sjkdhskljdhs?",
                        "username": "u2"
                    }
                ]
            },
            {
                "title": "event 231239",
                "username": "u3",
                "questions": []
            },
            {
                "title": "event 37739283",
                "username": "u5",
                "questions": []
            }
        ]
    }    

    this.getAllEvents = function(){
        return data.events;
    };

    this.getEvent = function(eventId){
         for(var i = 0; i < data.events.length; i++){
             if(i === eventId){
                 return data.events[i]
             }
         }
    };
});