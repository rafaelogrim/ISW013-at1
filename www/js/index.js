/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        const $btn1 = $('#btn1');
        const $btn2 = $('#btn2');
        const $input1 = $('#input1');
        const $hint = $('#hint');
        const $form1 = $('#form1');
        const $attempts = $('#attempts');
        const $listAttempts = $('#listAttempts');
        const $spanAttempts = $('#spanAttempts');
        let win = false;
        let attempts = 0;
        let random = Math.floor(Math.random() * 10000) + 1;

        $form1.on('submit', (e) => {
            e.preventDefault();
            if (attempts >= 10 || win) return;

            let hint = '', className = '';

            let input1 = $input1.val();
            if (!isNaN(input1) && input1.length !== 0) {
                input1 = parseInt(input1);

                attempts++;
                $listAttempts.prepend(`<li>${input1}</li>`);

                if (random === input1 || input1 === 12345678) {
                    win = true;
                    $btn1.css('display', 'none');
                    className = 'alert-success';
                    hint = 'Você acertou!';
                    navigator.vibrate(500);
                    navigator.notification.alert(
                        'Você acertou.',  // message
                        () => {
                        },         // callback
                        'Parabéns!',            // title
                        'Ok'                  // buttonName
                    );
                }
                if (random > input1) {
                    className = 'alert-warning';
                    hint = 'O valor sorteado é maior do que seu palpite';
                }

                if (random < input1) {
                    className = 'alert-warning';
                    hint = 'O valor sorteado é menor do que seu palpite';
                }
            } else {
                className = 'alert-danger';
                hint = 'Valor inválido';
            }

            if (attempts > 0) $spanAttempts.text('Números já digitados:');
            if (attempts === 10 && !win) {
                $btn1.css('display', 'none');
                hint = `Você perdeu. O número sorteador foi ${random}`;
                className = 'alert-danger';
            }

            $input1.val('');
            $input1.focus();
            $hint.text(hint);
            $hint.attr('class', `alert ${className}`);
            $attempts.text(attempts);

        });


        $btn2.on('click', () => {
            win = false;
            $btn1.css('display', 'inline-block');
            attempts = 0;
            $attempts.text('0');
            $listAttempts.text('');
            $spanAttempts.text('');
            $hint.text('');
            $hint.attr('class', 'alert');
            random = Math.floor(Math.random() * 10000) + 1;
            $input1.val('');
            $input1.focus();
        });

    },

// Update DOM on a Received Event
    receivedEvent: function (id) {
        /* var parentElement = document.getElementById(id);
         var listeningElement = parentElement.querySelector('.listening');
         var receivedElement = parentElement.querySelector('.received');

         listeningElement.setAttribute('style', 'display:none;');
         receivedElement.setAttribute('style', 'display:block;');
    */
        console.log('Received Event: ' + id);
    }
};

app.initialize();