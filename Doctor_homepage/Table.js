$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );


    
    // DataTable
    var table = $('#example').DataTable();

    //threshold
    $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('.max').val(), 10 );
        var Mprocess = parseFloat( data[5] ) || 0; // use data for the age column
 
        if ( ( isNaN( 0 ) && isNaN( max ) ) ||
             ( isNaN( 0 ) && Mprocess <= max ) ||
             ( 0 <= Mprocess   && isNaN( max ) ) ||
             ( 0 <= Mprocess   && Mprocess <= max ) )
        {
            return true;
        }
        return false;
    }
    );

    // jQuery.fn.dataTableExt.afnFiltering.push(
    // function( oSettings, aData, iDataIndex ) {
    //     var iColumn = 5;
    //     var iMin = document.getElementById('min1').value * 1;
    //     var iMax = document.getElementById('max1').value * 1;
 
    //     var iVersion = aData[iColumn] == "-" ? 0 : aData[iColumn]*1;
    //     if ( iMin === "" && iMax === "" )
    //     {
    //         return true;
    //     }
    //     else if ( iMin === "" && iVersion < iMax )
    //     {
    //         return true;
    //     }
    //     else if ( iMin < iVersion && "" === iMax )
    //     {
    //         return true;
    //     }
    //     else if ( iMin < iVersion && iVersion < iMax )
    //     {
    //         return true;
    //     }
    //     return false;
    // }
    // );

    $(document).ready(function() {
    var table = $('#example').DataTable();
    // $('#min1').keyup( function() { table.draw(); } );
    // $('#max1').keyup( function() { table.draw(); } );
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, .max').keyup( function() {
        table.draw();
    } );
    } );

    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );
    
    $('a.toggle-vis').on('click', function(e) {
        e.preventDefault();

        var column = table.column( $(this).attr('data-column'));
        column.visible(! column.visible());
    });

    $('#example tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = table.cell(this).index().column;
 
            $( table.cells().nodes() ).removeClass( 'highlight' );
            $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
        } );

    $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    } );
     
    // $('table.table').DataTable( {
    //     ajax:           '../ajax/data/arrays.txt',
    //     scrollY:        200,
    //     scrollCollapse: true,
    //     paging:         false
    // } );
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() == this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
} );