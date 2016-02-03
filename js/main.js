function main() {

  (function () {
    'use strict';

    /*====================================
     Page a Link Smooth Scrolling
     ======================================*/
    $('a.page-scroll').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 900);
          return false;
        }
      }
    });

    /*====================================
     Menu Active Calling Scroll Spy
     ======================================*/
    $('body').scrollspy({
      target: '.navmenu',
      offset: 80,
    });

    /* ==========================================================================
     Contact Form
     ============================================================================= */
    if( $.validator && $.fn.ajaxSubmit ) {

      (function() {
        var formSelector = '.form-group,[class*="col-xs-"],[class*="col-sm-"],[class*="col-md-"],[class*="col-lg-"]';

        // override jquery validate plugin defaults
        $.validator.setDefaults({
          highlight: function( el ) {
            $( el ).closest( formSelector ).addClass( 'has-error' );
          },
          unhighlight: function( el ) {
            $( el ).closest( formSelector ).removeClass( 'has-error' );
          },
          errorElement: 'span',
          errorClass: 'help-block',
          errorPlacement: function( error, el ) {
            error.insertAfter( el );
          }
        });

        $( '.contact-form' ).each(function() {
          $( this ).validate({
            submitHandler: function( form ) {
              $( form ).ajaxSubmit(function( response ) {
                response = $.parseJSON( response );
                $( $(document)[0].createElement( 'div' ) )
                  .addClass( 'alert' )
                  .toggleClass( 'alert-danger', ! response.success )
                  .toggleClass( 'alert-success', response.success )
                  .html( response.message )
                  .prepend( '<button type="button" class="close" data-dismiss="alert">&times;</button>' )
                  .hide().prependTo( form ).slideDown();

                if( response.success ) {
                  $( form ).resetForm();
                }
              });
            }
          });

          $(this).on('click', '.send-btn', function(){
            $('.contact-form').trigger('submit');
            return false;
          });

        });
      })();

    }

  }());

}
main();