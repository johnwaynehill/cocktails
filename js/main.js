var currentPage = "home";
var oldPage     = null;

function showType( type )
{
	if( currentPage != "home" ) // there was a cocktail showing, remove it and show everything.
	{
                
	}
    else // all cocktails are being shown already, remove them all and re-display (for fun).   
    {
        // remove any old stuff from the document
        $('#cocktail_list').remove();
        $('#cotm').remove();
    }
		
	if( type == "All" )
	{
        showAllDrinks();        
	}
	else
	{
        showDrinkType( type );
	}
}

function showAllDrinks()
{
    oldPage     = currentPage;
    currentPage = "home";
    
    
    // first, remove all old drinks
    removeOldDrinks();
    
    
    // double check that the old list is removed
    if( $('#cotm') )
    {
          $('#cotm').remove(); 
    }
    
    if( $('#cocktail_list') )
    {
          $('#cocktail_list').remove(); 
    }
    
    
    // create the new COTM and List elements
    $('body').append( '<section id="cotm"></section>');
    $('body').append( '<section id="cocktail_list"></section>');
    
    
    // create the Titles for each section
    $('<span class="title">Cocktail of the Month</span>').hide().appendTo('#cotm').effect( 'slide', {direction: 'left', easing: 'easeInOutQuart'}, 300 );
    $('<span class="title">All Cocktails</span>').hide().appendTo('#cocktail_list').delay(550).effect( 'slide', {direction: 'left', easing: 'easeInOutQuart'}, 300 );

    
    // create the cocktail list element
    $('<ul id="thumbnail_lists"></ul>').appendTo('#cocktail_list');
    
    
    // loop over all the drinks from drinks.json and add to appropriate lists
    $.each( drinksJson.drinks, function(key, drink) 
    {            
        if( drink.cotm == "Yes" ) // add the COTM to the COTM section
        {
            var cotmHtml    = "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src=\"img/cocktails/"+drink.photo+"\" /></a><p><a href=\"javascript: showDrink('"+drink.name+"');\">"+drink.name+"</a></p>";
            cotmHtml        = $.parseHTML( cotmHtml );
            
             $(cotmHtml).hide().appendTo('#cotm').delay(400).fadeIn();
        }
        else
        {
            if( key % 2 == 0 ) // add a sepecial class to the even items of the cocktail list
            {
                if( key % 5 == 0 )
                {
                    var drinkHtml   = "<li class=\"second fifth\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
                }
                else
                {
                    var drinkHtml   = "<li class=\"second\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
                }
            }
            else if( key % 5 == 0 )
            {
                var drinkHtml   = "<li class=\"fifth\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
            }
            else
            {
                var drinkHtml   = "<li>" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
            }
            
            
            // make the HTML and append it to the list
            drinkHtml       = $.parseHTML( drinkHtml );
            $(drinkHtml).hide().appendTo('#thumbnail_lists').delay(950).fadeIn();;
        }
    });    
}

function showDrinkType( drinkType )
{
    oldPage     = currentPage;
    currentPage = "category";
    var numType = 1;

    
    // first, remove all old drinks
    removeOldDrinks();
    

    
    // double check that the old list is removed
    if( $('#cocktail_list') )
    {
          $('#cocktail_list').remove(); 
    }
    
    
    // create the new COTM and List elements
    $('body').append( '<section id="cocktail_list"></section>');
    
    
    // create the Titles for each section
    $('<span id="custom_type" class="title">'+drinkType+' Cocktails</span>').hide().appendTo('#cocktail_list').delay(550).effect( 'slide', {direction: 'left', easing: 'easeInOutQuart'}, 300 );

    // create the cocktail list element
    $('<ul id="thumbnail_lists"></ul>').appendTo('#cocktail_list');
    
    
    // loop over all the drinks from drinks.json and add to appropriate lists
    $.each( drinksJson.drinks, function(key, drink) 
    {            
        if( drink.type == drinkType ) // add the COTM to the COTM section
        {
            if( numType % 2 == 0 ) // add a sepecial class to the even items of the cocktail list
            {
                if( numType % 5 == 0 )
                {
                    var drinkHtml   = "<li class=\"second fifth\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
                }
                else
                {
                    var drinkHtml   = "<li class=\"second\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
                }
            }
            else if( numType % 5 == 0 )
            {
                var drinkHtml   = "<li class=\"fifth\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
            }
            else
            {
                var drinkHtml   = "<li>" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
            }
            
            // make the HTML and append it to the list
            drinkHtml       = $.parseHTML( drinkHtml );
            $(drinkHtml).hide().appendTo('#thumbnail_lists').delay(950).fadeIn();;
            
            numType++;
        }
    });
}

function showDrink( drinkName )
{
    oldPage     = currentPage;
    currentPage = "cocktail";
    var nameHtml;
    var imgHtml;
    var ingrHtml;
    var dirHtml;
    var altHtml;
    
    
    // first, remove all old drinks
    removeOldDrinks();
    
    
    // create the new elements
    $('body').append( '<section id="cocktail"></section>');
    $('body').append( '<section id="ingredients"></section>');
    $('body').append( '<section id="directions"></section>');
		
	$.each( drinksJson.drinks, function(key, drink) 
	{
		if(drink.name == drinkName)
		{
            nameHtml    = '<span id="drink_title" class="title">'+drink.name+'</span>';
            imgHtml     = '<a id="current_drink" href="javascript: showPhoto(\''+drink.photo+'\');"><img src="img/cocktails/'+drink.photo+'" /></a>';
            ingrHtml    = '<h4>Ingredients</h4>';
            ingList     = '<ul id="ingredientsList"></ul>';
            dirHtml     = '<h4>Directions</h4><p>' + drink.directions + '</p>';
            
            nameHtml    = $.parseHTML( nameHtml );
            imgHtml     = $.parseHTML( imgHtml );
            ingrHtml    = $.parseHTML( ingrHtml );
            ingList     = $.parseHTML( ingList );
            dirHtml     = $.parseHTML( dirHtml );

			$.each( drink.ingredients, function(key, ingredient) { 
                $(ingList).append('<li>' + ingredient + '</li>'); 
            });
            
            if( drink.alternate )
            {
                altHtml = "<h4>Alternate</h4><p>" + drink.alternate + "</p>";
                altHtml     = $.parseHTML( altHtml );
            }
		}
	});
    
    
    // show the new drink
    $(nameHtml).hide().appendTo('#cocktail').delay(600).effect( 'slide', {direction: 'left', easing: 'easeInOutQuart'}, 300 );
    $(imgHtml).hide().appendTo('#cocktail').delay(700).fadeIn();
    $('#ingredients').hide();
    $(ingrHtml).appendTo('#ingredients');
    $(ingList).appendTo('#ingredients');
    $('#ingredients').delay(750).fadeIn();
    $(dirHtml).hide().appendTo('#directions').delay(800).fadeIn();
    
    if( altHtml )
    {
        
        $(altHtml).hide().appendTo('#directions').delay(900).fadeIn();
    }
}

function removeOldDrinks()
{
    if( oldPage == "home" )
    {
        // remove all current elemens with animations
        $('#thumbnail_lists li').fadeOut(300);
        $('#cotm a').delay(350).fadeOut(300);
        $('#cocktail_list .title').delay(400).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cotm .title').delay(450).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail_list').delay(320).fadeOut( 10, function(){ $('#cocktail_list').remove(); } );
        $('#cotm').delay(320).fadeOut( 10, function(){ $('#cotm').remove(); } );
    }
    else if( oldPage == "category" )
    {
        // remove all current elemens with animations
        $('#thumbnail_lists li').fadeOut(300);
        $('#cotm a').delay(350).fadeOut(300);
        $('#cocktail_list .title').delay(400).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail_list').delay(320).fadeOut( 10, function(){ $('#cocktail_list').remove(); } );
    }
    else ( oldPage == "cocktail" )
    {
        // fade out directions, ingredients, photo, then slide out name
        $('#directions').fadeOut( 300, function(){ $('#directions').remove(); } );
        $('#ingredients').delay(50).fadeOut( 300, function(){ $('#ingredients').remove(); } );
        $('#current_drink').delay(350).fadeOut(300);
        $('#drink_title').delay(450).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail').delay(550).fadeOut( 300, function(){ $('#cocktail').remove(); } );
    
        // remove all current elemens with animations
        $('#thumbnail_lists li').fadeOut(300);
        $('#cocktail_list .title').delay(400).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail_list').delay(550).fadeOut( 300, function(){ $('#cocktail').remove(); } );
    }
}