var uiElements = uiElements || {};

uiElements.rangeChart = uiElements.rangeChart || {};

(function(){

    uiElements.rangeChart.applyLineHoverEffects = function($container) {
        if (typeof $ == 'undefined')
            console.log("ERROR: jQuery is not loaded or it is not accesible");

        var onHoverIn = function() {
            $(this).find('.limitbox').show(100);
        };

        var onHoverOut = function() {
            $(this).find('.limitbox').hide(100);
        };

        $container.find('.range-chart-row').hover(onHoverIn, onHoverOut);
    };

    uiElements.rangeChart.calculateBaselinePosition = function($container) {
        var space = 20;
        var baselineHeight = $container.height() - space;
        var $baseline = $container.find('.baseline');

        $baseline.css('height', baselineHeight + 'px');
        $baseline.css('top', space + 'px');
    };

    uiElements.rangeChart.calculateHeaderWidth = function($container) {
        var chartWidth = $container.find('.range-chart').width();
        var headerWidth = $container.width() - chartWidth;
        var $dataHeader = $container.find('.data-header');

        $dataHeader.css('width', headerWidth + 'px');
        $dataHeader.css('left', '-' + headerWidth + 'px');
        $container.find('.legend-description').css('left', '-' + headerWidth + 'px');
    };

})();

(function($) {

    function composeLegend(configuration) {
        var range = configuration.maxValue - configuration.minValue;
        var subRange = range / 8;

        var output = '<div class="legend-description">' + configuration.legendDescription + '</div>';
        output = output + '<div class="legend">';
        output = output + '<div class="label min"></div>';
        for (var i = 0; i < 7; i++) {
            var position = i + 1;
            if (configuration.legend) {
                var label = configuration.legend.labels[i] + configuration.legend.postfix || '';
            } else {
                var label = (subRange * position + configuration.minValue).toFixed(2) + configuration.postfix || '';
            }

            output = output + '<div class="label label-' + position + '"><div class="label-data">' + label + '</div></div>';
        }
        output = output + '<div class="label max"></div>';
        output = output + '</div>';
        return output;
    }

    function composeLines() {
        var output = '<div class="lines">';
        for (var i = 0; i < 7; i++) {
            var position = i + 1;
            output = output + '<div class="line col-' + position + '"></div>';
        }
        output = output + '</div>';

        return output;
    }

    function largerValue(a, b) {
        return (a > b) ? a : b;
    }

    function smallerValue(a, b) {
        return (a < b) ? a : b;
    }

    function composeChartLine(minValue, maxValue, range, postfix, configuration) {
        var elementDescription = range.label;
        var elementLink = range.link;

        var output = '<div class="range-chart-row"><div class="data-header"><a href="' + elementLink + '"><div class="header-label">'  + elementDescription + '</div></a></div>';

        var totalWidth = maxValue - minValue;
        var rangeMax = smallerValue(range.max, maxValue);
        var rangeMin = largerValue(range.min, minValue);
        var percentualRangeWidth = (rangeMax - rangeMin) / totalWidth * 100;
        var percentualRangeStart = (rangeMin - minValue) / totalWidth * 100;

        var dataInfo = '<div class="data-info"><div class="graph" style="width: ' + percentualRangeWidth + '%; left: ' +
            percentualRangeStart + '%;"><div class="limitbox min-value"><div class="inner">' + rangeMin + postfix +
            '</div></div><div class="limitbox max-value"><div class="inner">' + rangeMax + postfix + '</div></div></div></div>';
        output = output + composeLines() + dataInfo + '</div>';

        return output;
    }

    function composeChart(configuration) {
        var output = '<div class="range-chart">';

        if (configuration.userValue) {
            var totalWidth = configuration.maxValue - configuration.minValue;
            var percentualRangeStart = (configuration.userValue.value - configuration.minValue) / totalWidth * 100;
            output = output + '<div class="baseline" style="left: ' + percentualRangeStart + '%"><div class="baseline-label">' + configuration.userValue.label + '</div></div>';
        }

        output = output + composeLegend(configuration);
        if (configuration)
            for (var i = 0; i < configuration.ranges.length; i++)
                output = output + composeChartLine(configuration.minValue, configuration.maxValue, configuration.ranges[i], configuration.postfix, configuration);
        output = output + '</div>';

        return output;
    }

    var $chartContainers = [];

    $.fn.rangeChart = function(configuration) {
        this.html(composeChart(configuration));

        uiElements.rangeChart.applyLineHoverEffects(this);
        uiElements.rangeChart.calculateBaselinePosition(this);
        uiElements.rangeChart.calculateHeaderWidth(this);

        $chartContainers.push(this);
    };

    $(window).resize(function() {
        $chartContainers.forEach(function($chartContainer) {
            uiElements.rangeChart.applyLineHoverEffects($chartContainer);
            uiElements.rangeChart.calculateBaselinePosition($chartContainer);
            uiElements.rangeChart.calculateHeaderWidth($chartContainer);
        });
    });
}(jQuery));