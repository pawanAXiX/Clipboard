import { useState ,useEffect} from 'react'
import Card from './Card'
import './App.css'

type CopiedData={
    text?:string;
    image?:string;
};

type ClipboardProps={
    onCopy:(data:CopiedData)=>void;
}