function startApp() {

    sessionStorage.clear();
    showMenu();


    $("#linkHome").click(homeView);
    $("#linkLogin").click(loginView);
    $("#linkGallery").click(galleryView);
    $("#linkListPrice").click(priceView);
    $("#linkContacts").click(contactView);
    $("#linkLogout").click(logoutView);

    //Bind from submit button

    $("#buttonLoginUser").click(loginUser);

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppId = "kid_H1LDM2cIl";
    const kinveyAppSecret = "a48d17d841294b73a1247b4e2ea597c9";
    const kinveyAutHeaders = {"Authorization": "Basic "+ btoa(kinveyAppId + ":" + kinveyAppSecret)};

    $(document).on({
        ajaxStart: function(){
            $("#loadingBox").show();
        },
        ajaxStop: function(){
            $("#loadingBox").hide();
        }
    });

    function showMenu (){
        if(sessionStorage.getItem("authToken")){
            $("#linkHome").show();
            $("#linkLogin").hide();
            $("#linkEdit").show();
            $("#linkGallery").show();
            $("#linkListPrice").show();
            $("#linkContacts").show();
            $("#linkLogout").show();
        }else{
            $("#linkHome").show();
            $("#linkLogin").show();
            $("#linkEdit").hide();
            $("#linkGallery").show();
            $("#linkListPrice").show();
            $("#linkContacts").show();
            $("#linkLogout").hide();
            showView("viewHome")
        }
    }

    function showView(view){
        $("main >section").hide();
        $("#"+view).show()
    }

    function homeView(){
        showView("viewHome")
    }

    function loginView(){
        showView("viewLogin")
    }

    function galleryView(){
        showView("viewGallery")
    }

    function priceView(){
        showView("viewPrice")
    }

    function contactView(){
        showView("viewContact")
    }

    function loginUser(){

        let body =JSON.stringify({
            username: $("#formLogin input[name=username]").val(),
            password: $("#formLogin input[name=passwd]").val()
        });
        $.ajax({
            method:"POST",
            url:kinveyBaseUrl+"user/"+kinveyAppId+"/login",
            headers:kinveyAutHeaders,
            contentType:"application/json",
            data:body,
            success:loginSuccess,
            error:getError
        });

        function loginSuccess(data){
            sessionStorage.setItem("username",data.username);
            sessionStorage.setItem("authToken",data._kmd.authtoken);
            sessionStorage.setItem("userId",data._id);
            $("#loggedInUser").text("Welcome "+ data.username +"!");
            $("#formLogin input[name=username]").val("");
            $("#formLogin input[name=passwd]").val("");

            $("#loggedInUser").show();
            showMenu();
            $("#viewLogin").hide();
            showInfo("success");

        }
    }

    function logoutView(){
        $.ajax({
            method:"POST",
            url:kinveyBaseUrl+"user/"+kinveyAppId+"/_logout",
            headers:{"Authorization":"Kinvey "+sessionStorage.getItem("authToken")},
            body:JSON.stringify(""),
            success:successLogout,
            error:getError
        });

        function successLogout(index){
            sessionStorage.clear();
            showInfo("success logout")
            showView('viewAppHome');
            $("#loggedInUser").empty();
            showMenu();
        }
    }

    function getError(response){
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        Error(errorMsg);
    }

    function Error(errorMsg){
        console.dir(errorMsg)
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    function showInfo(message){
        $("#infoBox").text(message);
        $("#infoBox").show();
        setTimeout(function(){
            $("#infoBox").fadeOut();
        },2000)
    }


}