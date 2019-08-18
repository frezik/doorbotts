import * as tap from 'tap';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );
Doorbot.log.info( "Test message" );
tap.pass( "Ran log" );
