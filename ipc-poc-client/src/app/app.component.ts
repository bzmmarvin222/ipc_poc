///<reference path="../../typings/typings.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const PIPE_NAME = 'ipc_poc_pipe';
const PIPE_PATH = '\\\\.\\pipe\\' + PIPE_NAME;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _receivedMessages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _receivedMessages: string[] = [];

  // for some reason angular does not update the view if the subject gets its value from the net client
  // maybe this will change if moved to a service?
  public msgs$: Observable<string[]> = combineLatest(
    interval(200),
    this._receivedMessages$
  ).pipe(map(([dummy, messages]: [number, string[]]) => messages));

  ngOnInit(): void {
    const self = this;
    const net = electron.remote.app.getNetForTcp();
    const client = net.connect(PIPE_PATH, () => {
      self.appendMessage('Connected...');
    });

    client.on('data', (msg) => {
      self.appendMessage(msg.toString());
    });
  }

  private appendMessage(msg: string) {
    this._receivedMessages.push(msg);
    this._receivedMessages$.next(this._receivedMessages);
  }
}
