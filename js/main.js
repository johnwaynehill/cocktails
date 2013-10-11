
function showType( type )
{
	if( $('#cocktail') )
	{
		$('#cocktail').remove();
		$('#ingredients').remove();
		$('#directions').remove();
	}
		
	if( type == "all" )
	{
		$.each( drinksJson.drinks, function(key, drink) 
		{
			if( drink.cotm == "Yes" )
			{
				$('body').append( '<section id="cotm"><span class="title">Cocktail of the Month</span><a href="javascript: showDrink(\''+drink.name+'\');"><img src="img/cocktails/'+drink.photo+'" /></a><p><a class="title" href="javascript: showDrink(\''+drink.name+'\');">'+drink.name+'</a></p></section>' );
				
				$('body').append( '<section id="cocktail_list"><span class="title">All Cocktails</span><ul id="thumbnail_lists"></ul></section>' );
			}
			else
			{
				if( key % 2 == 0 )
				{
					$('#thumbnail_lists').append( "<li class='second'>" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>" );
				}
				else
				{
					$('#thumbnail_lists').append( "<li>" + "<a href=\"javascript: showDrink('"+drink.name+"');\"><img src='img/cocktails/thumbnails/"+drink.photo+"' />" + drink.name + "</a></li>" );
				}
				
			}
		});
	}
	else
	{
		
	}
}

function showDrink( drinkName )
{
	$('#cotm').remove();
	$('#cocktail_list').remove();
		
	$.each( drinksJson.drinks, function(key, drink) 
	{

		if(drink.name == drinkName)
		{
			$('body').append( '<section id="cocktail"><span class="title">'+drink.name+'</span><a href="javascript: showPhoto(\''+drink.photo+'\');"><img src="img/cocktails/'+drink.photo+'" /></a></section>' );
			$('body').append('<section id="ingredients"><h4>Ingredients</h4><ul id="ingredientsList"></ul>');
			$.each( drink.ingredients, function(key, ingredient) { $('#ingredientsList').append('<li>' + ingredient + '</li>'); });
			$('body').append('<section id="directions"><h4>Directions</h4><p>' + drink.directions + '</p>');
		}
	});
}