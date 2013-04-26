jQuery.relativeTime
===================

Display time relative to current time at client using jQuery plugin.

jQuery.relativeTime is a little jQuery plugin to show relative timestamps in your webpage.

It's inspired by another jQuery plugin timeago(hosted by Terry Tai, Pragmatic.ly.) but give more flexibility and more intelligently.

Installation
------------

Just copy the demo/lib/jQuery.relativeTime.min.js to your project folder then load it after jQuery.


Usage
------------

By default jQuery.relativeTime will keep watching on the time elements with a class of relativeTime in datetime attribute:

    <time class="relativeTime" datetime="Dec 12 2012 07:51:50">about 8 hours ago</time>
    
You can initialize the jQuery.relativeTime in global like:

    $('body').relativeTime();
    
It will watch all your relative time elements by only one relativeTime instance.

Or you can use it in a specify scope like.
   
    <div class="timeLables">
     <time class="relativeTime" datetime="Dec 12 2012 07:51:50">about 8 hours ago</time>
     <time class="relativeTime" datetime="Dec 12 2012 06:51:50">about 9 hours ago</time>
    </div>
    
    $('.timeLables').relativeTime();
 
It will create one relativeTime instance to update the time elements in the div with timeLables class.

if you need dynamic add the time element to your document without refreshing the page or you want to refresh the relativeTime manually. You might need to call the refresh function to refresh the instance like:

    $('.relativeTime').relativeTime('refresh');

    
Configuration
--------------

There are some default configurations in jQuery.relativeTime:

    $.fn.relativeTime.defaults = {
      selector: 'time.relativeTime',
      attr: 'datetime'
    };
    
The 'time.relativeTime' is the default selector to watch and update.

The 'datetime' is the default attribute to put parse able date string.

You can change the default configurations by passing the options to
relativeTime function when initialize relativeTime like:

    $('.relativeTime').relativeTime({selector: 'span.relativeTime', attr: 'title'})


TODO
-----

Thanks very much if you could contribute.


Credits
-------

jQuery.relativeTime is maintained and funded by Md. Jahirul Islam Bhuiyan.

Thanks to all the contributors.

Special thanks to Terry Tai, Pragmatic.ly.

Copyright (c) 2012-2013 Md. Jahirul Islam Bhuiyan (http://www.online4help.net)
