## Socket 
- A socket is one end of the connection. It is the combination of Ip address and Port number

## WebRTC : follow 4 layares 
- Signalling : follow SDP(Session Descrription Protocol) in which the sinalling server exchanges the socket innformation of two clients
- Connecting : follow ICE(Interactive Connectivity Establishment) Protocol to connect the two clients   
- Securing : follow DLTS and SRTP in this we secures the connection with encryptions and certifications
- Communication: RTP SCTP   

## Architecture
-  P2P (Peer to Peer)  : data is uploaded and dowloaded to/from each node
- SFU (Selective Forwarding Unit) : data is updoded to server and and server return all else nodes data to for downloading
- MCU ( Multi Point Control Unit) : server combine all the down stream data into one stream for each node, so now each client gets only one 

## Backend Technologies :
- Bcrypt
- Crypto
- Socket
- Express JS

## Frontend Technologies:
- Material UI
- WebRTC
- CSS
- React