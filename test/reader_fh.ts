import * as tap from 'tap';
import * as fs from 'fs';
import * as ReaderFH from '../src/reader_fh';
import * as Reader from '../src/reader';
import * as Auth from '../src/authenticator_always';
import * as Activator from '../src/activator_do_nothing';

const INPUT_FILE = "test_data/reader.txt";

tap.plan( 2 );


const always = new Auth.AlwaysAuthenticator();
const act = new Activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});

const fh = fs.createReadStream( INPUT_FILE );
const fh_reader = new ReaderFH.FHReader( fh );

tap.ok( fh_reader instanceof Reader.Reader,
    "Keyboard reader is a Reader" );

fh_reader.setAuthenticator( always );
always.setActivator( act );

fh_reader
    .runOnce()
    .then( (res) => {} );
