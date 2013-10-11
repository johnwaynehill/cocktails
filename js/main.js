var currentPage = "home";

function showType( type )
{
	if( currentPage != "home" ) // there was a cocktail showing, remove it and show everything.
	{    
        // fade out directions, ingredients, photo, then slide out name
        $('#directions').fadeOut(300);
        $('#ingredients').delay(50).fadeOut(300);
        $('#current_drink').delay(350).fadeOut(300);
        $('#drink_title').delay(450).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail').delay(550).fadeOut();
        
        setTimeout(function(){
            // remove any old stuff from the document
            $('#directions').remove();
            $('#ingredients').remove();
            $('#cocktail').remove();
        }, 2000);
	}
    else // all cocktails are being shown already, remove them all and re-display (for fun).   
    {
        // remove any old stuff from the document
        $('#cocktail_list').remove();
        $('#cotm').remove();
    }
		
	if( type == "all" )
	{
        if( currentPage != "home" ) // user came from another "page", wait 1 second for other animations to finish
        {
            setTimeout(function(){ showAllDrinks(); }, 1000);
        }
        else
        {
            showAllDrinks();
        }
        
	}
	else
	{
		
	}
}

function showAllDrinks()
{
    currentPage = "home";

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
                var drinkHtml   = "<li class=\"second\">" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>";
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

function showDrink( drinkName )
{
    
    if( currentPage == "home" ) // if user is on home page
	{
        // remove all current elemens with animations
        $('#thumbnail_lists li').fadeOut(300);
        $('#cotm a').delay(350).fadeOut(300);
        $('#cocktail_list .title').delay(400).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cotm .title').delay(450).effect( 'slide', {direction: 'right', easing: 'easeInOutQuart'}, 300 );
        $('#cocktail_list').delay(320).fadeOut();
        $('#cotm').delay(320).fadeOut();
    }
    else
    {
        
    }
    
    
    currentPage = drinkName;
    var nameHtml;
    var imgHtml;
    var ingrHtml;
    var dirHtml;
    
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
    
    
    setTimeout(function(){
        // remove any old stuff from the document
        $('#cocktail_list').remove();
        $('#cotm').remove();
    }, 2000);
}