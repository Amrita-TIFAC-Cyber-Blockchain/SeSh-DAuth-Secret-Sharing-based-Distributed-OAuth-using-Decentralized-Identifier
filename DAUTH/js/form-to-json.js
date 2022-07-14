

'use strict';

jQuery(function( $ ){
    // plugin function

    $.fn.formToJson = function( resultContainer ){
        // console.log('this is from plugin');
        

        // define form
        const form = this;
        // define display target from parameter
        // if(resultContainer != undefined){
        //     const displayResultTarget = resultContainer;
        // }
        // console.log(resultContainer);

        // define submitted data
        let submittedData = [];
        

        // define form data structure
        let formData = {
            id: Number,
            firstname: String,
            middlename: String,
            lastname: String,
            email: String,
            ssn: String,
            bloodgroup: String,
            birthDate: String,
            phone: Number
            
        };
        // define json data for output
        let jsonOutputData = Object.create(formData);

        // form submission function
        $(form).submit(function( event ){
            event.preventDefault();

            // console.log($(form).serialize());
            // run sort data function
            sortData( $(form).serialize() );

            // run json data function
            jsonData();

            // display json data
            outputData();

            // reset data
            resetData();

        });

        // sort data function
        function sortData( data ){
            // sanity check
            if(data != undefined){
                // regular expessions
                const regxSpace = /(?:%20)/gi;
                const regxEmail = /(?:%40)/gi;
                const regxLineBreak = /(?:%0D%0A)/gi;
                // save data by replacing with regx and split with '&' as parts
                let sortedData = data.replace(regxSpace, ' ').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');
                // iterate through sortedData and save as array into submittedData
                $(sortedData).each(function(index, element){
                    submittedData.push(element.split('='));
                });

                // console.log(submittedData);
            }
        };

        // json data function
        function jsonData(){
            // sanity check
            if(submittedData != undefined || submittedData != null){
                // create JSON data
                $(submittedData).promise().done(function(){
                    // save json data
                    jsonOutputData.id = Math.random();
                    jsonOutputData.firstname = submittedData[0][1];
                    jsonOutputData.middlename = submittedData[1][1];
                    jsonOutputData.lastname = submittedData[2][1];
                    jsonOutputData.email = submittedData[3][1];
                    jsonOutputData.ssn = submittedData[4][1];
                    jsonOutputData.bloodgroup = submittedData[5][1];
                    jsonOutputData.birthDate = submittedData[6][1];
                    jsonOutputData.phone = submittedData[7][1]
                   
                    
                });
            }
        };

        // output data
        function outputData(){
            // stingify jsonOutputData for output
            let stringifyJsonData = JSON.stringify(jsonOutputData);

            // check if output target is provided
            if(resultContainer !== undefined || resultContainer !== null){
                $(jsonOutputData).promise().done(function(){
                    $(resultContainer).html( stringifyJsonData );
                    // return stringifyJsonData;
                    console.log(stringifyJsonData); // log the JSON data
                    STITS(stringifyJsonData);
                      
                    
                });
            }
            else{
                // else just return the JSON data
                console.log('resultContainer undefined');
                 
                // return stringifyJsonData;
            }


        }

        // reset data
        function resetData(){
            // reset all data
            submittedData = [];
            jsonOutputData = {};
        }

        //secret sharing
        async function STITS(args) {
            // var str = "{\"id\":0.023891680858690645,\"firstname\":\"prudhvi\",\"middlename\":\"krishna\",\"lastname\":\"Danda\",\"email\":\"prudhvi98.danda@gmail.com\",\"ssn\":\"1\",\"bloodgroup\":\"A%2B\",\"birthDate\":\"2022-07-07\",\"phone\":\"12345678910\"}";
            const node = await Ipfs.create();
            var str = args;
            var recstr = "";
            var K = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(8 * str.length);
            var i = 0;
            var j = 0;
            var count1 = 0;
            console.log("The secret is: " + str);
            for (count1 = 0; count1 < str.length; count1++) {
                {
                    var n1 = ((str.charAt(count1))).charCodeAt(0);
                    for (j = 0; j < 8; j++) {
                        {
                            if (n1 % 2 === 0)
                                K[count1 * 8 + j] = 0;
                            else if (n1 % 2 === 1)
                                K[count1 * 8 + j] = 1;
                            n1 = (n1 / 2 | 0);
                        }
                        ;
                    }
                }
                ;
            }
            console.log("The secret matrix K");
            // for (j = 0; j < K.length; j++) {
            //     {
                    
            //         var str = Share[j].join('');
            //         console.log(str);
            //     }
            //     ;
            // }
            
            var k = 0;
            var l = 0;
            var n = 4;
            var m = 6;
            var u = 0;
            var x = 0;
            var i1 = 0;
            var j1 = 0;
            var g = 0;
            var u1 = 0;
            var S0 = [[0, 0, 0, 1, 1, 1], [1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1]];
            var S1 = [[1, 1, 1, 0, 0, 0], [1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1]];
            var tempS0 = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i_1 = 0; i_1 < dims[0]; i_1++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([n, m]);
            var tempS1 = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i_2 = 0; i_2 < dims[0]; i_2++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([n, m]);
            var Share = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i_3 = 0; i_3 < dims[0]; i_3++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([n, K.length * m]);
            var COMB = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(K.length * m);
            var REC_K = (function (s) { var a = []; while (s-- > 0)
                a.push(0); return a; })(K.length);
            g = 0;
            for (j = 0; j < K.length; j++) {
                {
                    var numbers = ([]);
                    for (i1 = 0; i1 < m; i1++) {
                        {
                            /* add */ (numbers.push(i1) > 0);
                        }
                        ;
                    }
                    for (j1 = 0; j1 < m; j1++) {
                        {
                            for (i1 = 0; i1 < n; i1++) {
                                {
                                    tempS0[i1][j1] = S0[i1][ /* get */numbers[j1]];
                                    tempS1[i1][j1] = S1[i1][ /* get */numbers[j1]];
                                }
                                ;
                            }
                        }
                        ;
                    }
                    if (K[j] === 0) {
                        x = 0;
                        do {
                            {
                                for (u1 = 0; u1 < n; u1++) {
                                    Share[u1][g] = tempS0[u1][x];
                                }
                                g++;
                                x++;
                            }
                        } while ((x < m));
                    }
                    else {
                        x = 0;
                        do {
                            {
                                for (u1 = 0; u1 < n; u1++) {
                                    Share[u1][g] = tempS1[u1][x];
                                }
                                g++;
                                x++;
                            }
                        } while ((x < m));
                    }
                }
                ;
            }
            
            // console.log(results.path)

            for (u1 = 0; u1 < n; u1++) {
                {
                     console.log();
                     console.log("Share" + (u1 + 1));
                     var str;
                    // console.log();
                     for (j = 0; j < K.length * m; j++) {
                        
                        // console.log(Share[u1][j]);
                         str = Share[u1].join('');
                         
                    }
                    console.log(str);
                    if (u1>0){
                        const cid = await node.add(str);
                        console.log('CID created via ipfs.add:', cid.path)
                        document.getElementById("displayresult").innerHTML+= "Share "+ u1+":" + " " + cid.path + "<br/>"
                        console.log();
                        const chunks = [];
                        for await (const chunk of node.cat(cid.path)) {
                            chunks.push(chunk);
                        }
                        console.log("Added file contents:",chunks.toString());
                        // const data = await node.cat(cid)
                        // console.log('data present',data)
                        // const decoder = new TextDecoder();
                        // const decodedData = decoder.decode(data);
                        // console.log('Data read back via ipfs.cat:', decodedData);
                        // const sha256 = require('SHA-256');
                        // const address = cid;
                        // const bytes = sha256.decode(address);
                        // console.log(Buffer.from(bytes).toString(2));
                    }
                    
                    // console.log();
                    
                };
                
            }
            var s0 = 0;
            var s1 = 1;
            var s2 = 2;
            for (j = 0; j < K.length * m; j++) {
                {
                    if ((function (lhs, rhs) { return lhs || rhs; })((function (lhs, rhs) { return lhs || rhs; })(Share[s0][j] === 1, Share[s1][j] === 1), Share[s2][j] === 1))
                        COMB[j] = 1;
                    else
                        COMB[j] = 0;
                }
                ;
            }
            var count = 0;
            var val = 0;
            for (j = 0; j < K.length * m; j++) {
                {
                    if (COMB[j] === 1)
                        count = count + 1;
                    if ((j + 1) % m === 0) {
                        if (count === 6)
                            REC_K[val] = 1;
                        else
                            REC_K[val] = 0;
                        val = val + 1;
                        count = 0;
                    }
                }
                ;
            }
            console.log("The Reconstructed Matrix");
            // for (j = 0; j < K.length; j++) {
            //     {
            //         console.log(REC_K[j]);
            //     }
            //     ;
            // }
            console.log();
            for (count1 = 0; count1 < str.length; count1++) {
                {
                    var dec_value = 0;
                    var base = 1;
                    for (j = 0; j < 8; j++) {
                        {
                            dec_value += REC_K[count1 * 8 + j] * base;
                            base = base * 2;
                        }
                        ;
                    }
                    recstr = recstr + String.fromCharCode(dec_value);
                }
                ;
            }
            console.log("The Reconstructed secret is: " + recstr);
            
        };
        
    }
}(jQuery));