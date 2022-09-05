import { Kanji, maxKanjiLesson } from "./data";
import { getLocalization, defaultLang, Levels } from "./localization"

$(document).ready(function() {
    let jsonData, main, wordData;
    // let jsonData = getData();
    // let main = new Main(jsonData);
    // let wordData = main.getRandomWord();
    // main.showWord(wordData);

    addLabel();

    $(document).on('click', '.submit', function() {
        if ($("#from").val() != '' && $("#to").val() != '') {
            jsonData = Kanji(parseInt($("#from").val()) - 1, parseInt($("#to").val()) - 1 );
            main = new Main(jsonData);
            wordData = main.getRandomWord();
            main.showWord(wordData);

            $(".prepare").hide();
            $(".playground").show();

        } else {
            $(".error").append("<p style='color: red'>Please fill data.</p>")
        }
        
    });

    $(document).on('click', '.back', function() {
        $(".prepare").show();
        $(".playground").hide();
        $("#from").val("");
        $("#to").val("");
    });

    $(document).on('click', '.next', function() {
        main.nextWord(wordData);
    });

    $(document).on('click', '.skip', function() {
        main.skipWord(wordData);
    });

    $(document).on('click', '.level', function() {
        let array = [];
        $(".level").each(function() {
            if ($(this).is(':checked')) {
                $.merge( array, Levels[$(this).val()] );
            }
        })

        $("#from").val(Math.min(...array))
        $("#to").val(Math.max(...array))
    });

    $(document).keypress(function(e) {
        if (e.keyCode == 13) {
            main.nextWord(wordData);
        }

        if (e.keyCode == 32) {
            main.skipWord(wordData);
        }
    });

    $(document).on('change', '.localizationSwitch', function() {
        addLabel($(this).val());
    })
});

function addLabel(lang = null) {
    if (lang === null) {
        lang = defaultLang;
    }
    $(".info>p>i").text(getLocalization("info", lang).replace(/{length}/i, maxKanjiLesson()));
    $(".from-label").text(getLocalization("from", lang));
    $(".to-label").text(getLocalization("to", lang));
    $(".submit").text(getLocalization("submit", lang));
    $(".count .label").text(`${getLocalization("count", lang)} : `);
    $(".skip").text(getLocalization("skip", lang));
    $(".next").text(getLocalization("next", lang));
    $(".back").text(getLocalization("back", lang));
}
//   function getRandomWord(oldIndex = null) {
//     let returnData = [];
//     let data = JSON.parse(localStorage.getItem('data'));
    
//     if (data.length > 0) {
//       let index  = Math.floor(Math.random() * data.length);
//       console.log(oldIndex);
//       console.log(index);
//       if (oldIndex != null && index == oldIndex ) {
//         if (index == parseInt(data.length) - 1) {
//           index--;
//         } else {
//           index++;
//         }
//       }
//       returnData['index'] = index;
//       returnData['value'] = data[index];
//       returnData['status'] = 'success';
//       returnData['left'] = data.length;
//     } else {
//       returnData['status'] = 'end';
//     }
//     return returnData;
//   }

// function nextWord() {
// let data = JSON.parse(localStorage.getItem('data'));

// let key = $('#key').val();

// data = jQuery.grep(data, function(value, index) {
//     return index != key;
// });
// localStorage.setItem('data', JSON.stringify(data));

// let word = getRandomWord();
// showWord(word);
// }

// function skipWord() {
//     let skipWordArray = JSON.parse(localStorage.getItem('skipWord'));
//     let skipWord = $('h1').text();
//     if (skipWordArray == null) {
//       skipWordArray = [];
//     }
//     skipWordArray.push(skipWord);
//     localStorage.setItem('skipWord', JSON.stringify(skipWordArray));

//     let oldIndex = parseInt($('#key').val());
//     let word = getRandomWord(oldIndex);
//     showWord(word);
// }

// function showWord(data) {
//     if (data['status'] == "success") {
//       let skipWordArray = JSON.parse(localStorage.getItem('skipWord'));
      
//       if (skipWordArray != null && skipWordArray.includes(data['value'])) {
//         $('h1').css('color', 'red');
//       } else {
//         $('h1').css('color', '#000');
//       }

//       $('h1').text(data['value']);
//       $('#key').val(data['index']);
//       $('.left').text(data['left']);
//       console.log(data['left']);
//     } else {
//       $('h1').text("Congratulation! all are done.");
//     }
// }

class Main {

    constructor(data) {
        this.skipWords = [];
        this.data = data;
        console.log(maxKanjiLesson())
    }

    getRandomWord(oldIndex = null) {
        let returnData = [];
        let data = this.data;
        
        if (data.length > 0) {
            let index  = Math.floor(Math.random() * data.length);
            
            if (oldIndex != null && index == oldIndex ) {
                if (index == parseInt(data.length) - 1) {
                    index--;
                } else {
                    index++;
                }
            }
            returnData['index'] = index;
            returnData['value'] = data[index];
            returnData['status'] = 'success';
            returnData['left'] = data.length;
        } else {
            returnData['status'] = 'end';
        }
        return returnData;
    }

    nextWord() {
        let data = this.data;
        
        let key = $('#key').val();
    
        data = jQuery.grep(data, function(value, index) {
            return index != key;
        });
        this.data = data;
    
        let word = this.getRandomWord();
        this.showWord(word);
    }

    skipWord() {
        let skipWordArray = this.skipWords;
        let skipWord = $('h1').text();
        if (skipWordArray == null) {
            skipWordArray = [];
        }
        skipWordArray.push(skipWord);
        this.skipWords = skipWordArray;
    
        let oldIndex = parseInt($('#key').val());
        let word = this.getRandomWord(oldIndex);
        this.showWord(word);
    }

    showWord(data) {
        if (data['status'] == "success") {
            let skipWordArray = this.skipWords;
            
            if (skipWordArray != null && skipWordArray.includes(data['value'].kanji)) {
                $('.kanji h1').css('color', 'gold');
            } else {
                $('.kanji h1').css('color', '#fff');
            }
        
            $('.kanji h1').text(data['value'].kanji);
            $('.kanji p').text(data['value'].hiragana);
            $('#key').val(data['index']);
            $('.left').text(data['left']);
        } else {
            $('.kanji h1').text("Congratulation! all are done.");
            $('.kanji p').text('');
            $('.left').text('0');
        }
    }
}