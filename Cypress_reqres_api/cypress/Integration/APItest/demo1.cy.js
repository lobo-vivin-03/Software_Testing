describe('API Testing Suite', () => {
    it('Fetch User Info', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('Retrieve Single User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.be.empty;
        });
    });
});

describe('API Testing Suite', () => {
    it('List All Resources', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown',
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('Fetch Single Resource', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/2',
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('Single Resource Not Available', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.be.empty;
        });
    });
});

describe('API Testing Suite', () => {
    it('Add New User', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                name: 'morpheus',
                job: 'leader',
            },
        }).then((response) => {
            expect(response.status).to.equal(201);
        });
    });
});

describe('API Testing Suite', () => {
    it('Modify User', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            body: {
                name: 'morpheus',
                job: 'zion resident',
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('Partial Update User Info', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            body: {
                name: 'morpheus',
                job: 'zion resident',
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});

describe('API Testing Suite', () => {
    it('Remove User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
        }).then((response) => {
            expect(response.status).to.equal(204);
        });
    });
});

describe('API Testing Suite', () => {
    it('Successful Registration', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol',
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('token');
            expect(response.body.id).to.equal(4);
            expect(response.body.token).to.equal('QpwL5tke4Pnpja7X4');
        });
    });
});

describe('API Testing Suite', () => {
    it('Unsuccessful Registration', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            body: {
                email: 'sydney@fife',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Missing password');
        });
    });
});

describe('API Testing Suite', () => {
    it('Login Successfully', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
            expect(response.body.token).to.equal('QpwL5tke4Pnpja7X4');
        });
    });
});

describe('API Testing Suite', () => {
    it('Login Failed', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                email: 'peter@klaven',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Missing password');
        });
    });
});

describe('API Testing Suite', () => {
    it('Handle Delayed Response', () => {
        const startTime = Date.now();

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3',
        }).then((response) => {
            expect(response.status).to.equal(200);

            const elapsedTime = Date.now() - startTime;
            expect(elapsedTime).to.be.greaterThan(3000);
            expect(response.body.data).to.be.an('array');

            response.body.data.forEach((user) => {
                expect(user).to.have.property('id');
                expect(user).to.have.property('email');
                expect(user).to.have.property('first_name');
                expect(user).to.have.property('last_name');
                expect(user).to.have.property('avatar');
            });
        });
    });
});
