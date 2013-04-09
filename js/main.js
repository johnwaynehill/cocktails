function setHeaderHeight()
{
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var docHeight = $(document).height();
    
    if(  winWidth > 800 )
    {
        if( winHeight > docHeight )
        {
            $('header').height( winHeight );
        }
        else
        {
            $('header').height( docHeight );   
        }   
    }
    else
    {
        $('header').height( 'auto' );    
    }
}

$(window).resize(function() 
{
  setHeaderHeight();
});

setHeaderHeight();