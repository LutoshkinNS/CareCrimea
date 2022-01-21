<?php
sleep(1);

if (isset($_POST)) {
	print 'Имя формы: '.$_POST['nameForm'].PHP_EOL;
	print 'Имя: '.$_POST['name'].PHP_EOL;
	print 'Номер телефона: '.$_POST['phone'].PHP_EOL;
	print 'Время для обратного звонка: '.$_POST['time'].PHP_EOL;
	print 'Комментарий: '.$_POST['comment'].PHP_EOL;
	print 'Адрес доставки: '.$_POST['adress'].PHP_EOL;
}

?>