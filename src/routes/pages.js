const express = require('express');
const router = express.Router();


module.exports = router;


router.get('/', (req, res) => {
    res.render('index')
})


router.get('/dashboard', async (req,res) => {
   try {
    let result = await fetch('http://localhost:8000/catways/1/reservations/all');
    let resultJSON = await result.json();
    const now = new Date();
    const activeReservations = resultJSON.filter(
      (r) => new Date(r.startDate) <= now && new Date(r.endDate) >= now
    );
    res.render('dashboard', {
        reservations : activeReservations
    });
   } catch (error) {
    res.status(500).send("Une erreur s'est produite")
   }
});

router.get('/reservations-list', async (req,res) => {
    try {
     let result = await fetch('http://localhost:8000/catways/1/reservations/all');
     let resultJSON = await result.json();
     console.log(resultJSON);
     res.render('reservations', {
         reservations : resultJSON});
    } catch (error) {
     res.status(500).send("Une erreur s'est produite")
    }
 });

router.get('/users-list', async (req,res) => {
    try {
     let result = await fetch('http://localhost:8000/users/');
     let resultJSON = await result.json();
     res.render('users', {users : resultJSON});
    } catch (error) {
     res.status(500).send("Une erreur s'est produite")
    }
 });

 router.get('/catways-list', async (req,res) => {
    try {
     let result = await fetch('http://localhost:8000/catways/');
     let resultJSON = await result.json();
     res.render('catways', {catways : resultJSON});
    } catch (error) {
     res.status(500).send("Une erreur s'est produite")
    }
 });


 router.get('/add-user', async (req,res) => {
     res.render('add-user')
    });
router.get('/add-catway', async (req,res) => {
    res.render('add-catway')
    });
    router.get('/add-reservation', async (req,res) => {
        res.render('add-reservation')
        });

router.post("/users/:email/delete", async (req, res) => {
    const email = req.params.email
        try {
            await fetch(`http://localhost:8000/users/${email}`, { method : 'DELETE'});
            res.redirect('/users-list');
        }
        catch(error) {
            return res.status(501).json(error);
        };
    }
    );

router.post("/users/:email/update", async (req, res) => {
    const email = req.params.email
    const user = req.body
        try {
            await fetch(`http://localhost:8000/users/${email}`, { 
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        });
        res.redirect('/users-list');
        }
        catch(error) {
            return res.status(501).json(error);
        };
    }
    );

    router.post("/catways/:id/delete", async (req, res) => {
        const id = req.params.id
            try {
                await fetch(`http://localhost:8000/catways/${id}`, { method : 'DELETE'});
                res.redirect('/catways-list');
            }
            catch(error) {
                return res.status(501).json(error);
            };
        }
        );

router.post("/catways/:id/update", async (req, res) => {
    const id = req.params.id
    const catway = req.body
        try {
            await fetch(`http://localhost:8000/catways/${id}`, { 
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(catway)
        });
        res.redirect('/catways-list');
        }
        catch(error) {
            return res.status(501).json(error);
        };
    }
    );

    router.post("/catways/:id/reservations/:idReservation/delete", async (req, res) => {
        const id = req.params.id
        const idReservation = req.params.idReservation
            try {
                await fetch(`http://localhost:8000/catways/${id}/reservations/${idReservation}`, { method : 'DELETE'});
                res.redirect('/reservations-list');
            }
            catch(error) {
                return res.status(501).json(error);
            };
        }
        );

    router.post("/catways/:id/reservations/:idReservation/update", async (req, res) => {
        const id = req.params.id
        const idReservation = req.params.idReservation
        const reservation = req.body
            try {
                await fetch(`http://localhost:8000/catways/${id}/reservations/${idReservation}`, { 
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(reservation)
            });
            res.redirect('/reservations-list');
            }
            catch(error) {
                return res.status(501).json(error);
            };
        }
        );

        
module.exports = router;