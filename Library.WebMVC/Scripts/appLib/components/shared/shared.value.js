(function () {

	angular.module('appLibrary.sharedModule')
		.value(
            'alphabets',
            [
                {
                	name: 'alphabetDg',
                	values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                	order: 100
                },
                {
                	name: 'alphabetEn',
                	values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                	order: 200
                },
                {
                	name: 'alphabetRu',
                	values: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
                             'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
                	order: 300
                }
            ]
		)

})()