from unittest import TestCase
from app import app
from flask import Flask, session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature

    # def setUp(self):
    #     with app.test_client() as client:

    #         client.get('/')

    def test_home(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['submissions'], [])
            self.assertEqual(session['scores'], [])
            self.assertIn('<button id="start_game">Start!</button>', html)

    def test_portal(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['scores'] = ['5', '6']
                change_session['boardSize'] = '5'

                resp = client.get('/play')
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn(
                    '<label for="guess">Guess The Word!</label>', html)

    # def test_submit(self):
    #     newGame = Boggle()
    #     board = newGame.make_board(5)
    #     with app.test_client() as client:
    #         with client.session_transaction() as change_session:
    #             change_session['board'] = board
    #             change_session['submissions'] = []

    #         resp = client.post('/submit-guess',
    #                            data={'guess': 'wilson'},
    #                            content_type='application/json')
    #         res = resp.get_data(as_text=True)
    #         print(res)

    #         self.assertEqual(resp.status_code, 200)
    #         self.assertEqual(res, {"guess": "not-in-board"})
