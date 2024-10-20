import Ably from 'ably';

export async function POST(request:Request){

        const ably=new Ably.Realtime('MKeE5A.42yzaw:mWNloaNsfI8_PGYWN8Ao675_1d-zfI_5d7o0MZtXXiM');
        ably.connection.on('connected', ()=>{
            console.log('Connected to Ably'); 
        })
        const channel=ably.channels.get('auction bids');

    try{
        type Bid = {
            user: string;
           bids: number;
          };
        const body:Bid=await request.json();
        const {user, bids}=body;
        console.log(user,bids);
        await channel.publish('new-bid',{user,bids});
        return new Response(JSON.stringify({ message: 'Successfully published' }), { status: 200 });

    }catch(err){
        console.error('Error while publishing bid:', err); // Log any errors encountered
    return new Response(JSON.stringify({ message: 'Error publishing bid' }), { status: 500 });
    }
}
