function startApp() {

    sessionStorage.clear();
    showMenu();


    $("#linkHome").click(homeView);
    $("#linkLogin").click(loginView);
    $("#linkGallery").click(galleryView);
    $("#linkListPrice").click(priceView);
    $("#linkContacts").click(contactView);
    $("#linkLogout").click(logoutView);

    function showMenu (){
        if(sessionStorage.getItem("authToken")){
            $("#linkHome").show();
            $("#linkLogin").hide();
            $("#linkGallery").show();
            $("#linkListPrice").show();
            $("#linkContacts").show();
            $("#linkLogout").show();
        }else{
            $("#linkHome").show();
            $("#linkLogin").show();
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

    function logoutView(){
        alert("logout")
    }


}