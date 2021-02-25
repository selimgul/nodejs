//const request = require('request');

// let url = "http://ddwsals/UQWebServices/core/UQDocumentService.svc/api/Login";
// let param = {
//     json: {
//         LoginInfo: {
//             Environment: 'GARDVL',
//             UserName: req.params.username,
//             Password: 'password'
//         }
//     }
// };

// request.post(url, param, (err, response, body) => {
//     if (body.Success)
//         res.locals.token = body.ReturnData;
//     else
//         res.locals.token = body.ErrorMessage;

//     res.render('login');
//     //res.render('login', {list:[1,2,3]});
// });   