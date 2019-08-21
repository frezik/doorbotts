import * as tap from 'tap';
import * as fs from 'fs';
import * as ReaderFH from '../src/reader_fh';
import * as Reader from '../src/reader';
import * as Auth from '../src/authenticator_always';
import * as Activator from '../src/activator_do_nothing';
import * as Doorbot from '../index';
import * as os from 'os';
import * as process from 'process';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

const INPUT_FILE = "test_data/reader.txt";

tap.plan( 2 );


const always = new Auth.AlwaysAuthenticator();
const act = new Activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
    process.exit( 0 );
});

const fh = fs.createReadStream( INPUT_FILE );
const fh_reader = new ReaderFH.FHReader( fh );

tap.ok( fh_reader instanceof Reader.Reader,
    "Keyboard reader is a Reader" );

fh_reader.setAuthenticator( always );
always.setActivator( act );
fh_reader.init();

setTimeout( () => {
    tap.fail( "Callback not made in timely fashion" );
    process.exit( 1 );
}, 2000 );
