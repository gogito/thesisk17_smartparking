import bnn
import os
import cv2
import json
from PIL import Image
from IPython.display import display
from pynq import Xlnk
import pynq
import numpy
import yaml 
import math
import time
import matplotlib.pyplot as plt


thresh_hold = 20
thresh_hold2 = 100
# update_url = "http://gogito.duckdns.org:3002/parkinglots/604a32355ba27b60787054bf"
# pre_json =  str('\{' "info" ':' '\{' "area" ':' '\[''\{' "name"':' "A1"',' "slots"':' '\[' )
# post_json = str()
folder = '/home/xilinx/jupyter_notebooks/bnn/segment'
coords = '/home/xilinx/jupyter_notebooks/bnn/coordinates/'
video_path = '/home/xilinx/jupyter_notebooks/bnn/video/'

#Instantiate the classifier:
hw_classifier = bnn.CnvClassifier(bnn.NETWORK_CNVW2A2,'cifar10',bnn.RUNTIME_HW)

#Read coordiantes from file
print("file")
file = open(os.path.join(coords, "c5_night.yaml"))
data = yaml.load(file)

print("video")
video_name = "thesis.mp4"
video = cv2.VideoCapture(os.path.join(video_path, video_name))

arr_size = len(data) 
frame_res = [-1] * arr_size
pre_frame_res = [-1] * arr_size
diff_status = [0] * arr_size
status = [0] * arr_size

send_flag = False
diff_interval = 5

counter = 0

# frameSize = (1080, 1920)
# frameSize = (1920, 1080)

slot_id = []
for line in data:
    slot_id.append(line['id'])

os.system('rm ./segment/*')
print("Start")
while (video.isOpened()):   
    start = time.time()
    images = []

    #Read original frame
    success, img = video.read()
    
    #Extract each slot for classify-----------
    if success == True:
#         img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
#         img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
#         img = cv2.convertScaleAbs(img, alpha=0.2, beta=0)
#         height, width, layer = img.shape
#         img = cv2.resize(img, (int(width/3),int(height/3)))
#         img = cv2.resize(img, (width,height))
        origin = img
        
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        counter += 1
#         path = './original-frame/origin_frame' + str(counter) + '.jpg'
#         cv2.imwrite(path,origin)
#         path = './full/' + str(counter) + '.jpg'
#         cv2.imwrite(path, img)
        for line in data:
            startX, startY, width, height  = line['point_array']

            crop = img[startY:startY + height, startX:startX + width]
#             path = './segment/' + str(line['id']) + '_' + str(counter) + '.jpg'
#             cv2.imwrite(path, crop)
            crop = cv2.resize(crop, (32,32))

            images.append(crop)
#         ranking = hw_classifier.classify_image_details(crop)

        rankingW2A2 = hw_classifier.classify_images_details(images)
#         rankingW2A2 = hw_classifier.classify_images(images)
#         cv2.putText(origin, str(counter), (50,50), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)
        for i in range (0, len(images)):
#             print("{: >8}{: >3} ".format("[Slot ID]", slot_id[i]))
#             print("{: >10}{: >10}".format(hw_classifier.classes[0],rankingW2A2[i*2 + 0]))
#             print("{: >10}{: >10}".format(hw_classifier.classes[1],rankingW2A2[i*2 + 1]))
#             if rankingW2A2[i*len(hw_classifier.classes) + 1] >= thresh_hold or rankingW2A2[i*len(hw_classifier.classes) + 3] > thresh_hold2:#> rankingW2A2[i*2]: #and rankingW2A2[i*2 + 1] >= thresh_hold + 100:
#             if (rankingW2A2[i*len(hw_classifier.classes) + 1] > rankingW2A2[i*len(hw_classifier.classes) + 0] and rankingW2A2[i*len(hw_classifier.classes) + 1] > rankingW2A2[i*len(hw_classifier.classes) + 2] and rankingW2A2[i*len(hw_classifier.classes) + 1] > rankingW2A2[i*len(hw_classifier.classes) + 3]):
#             if rankingW2A2[i] == 1 or rankingW2A2[i] ==3:
#             if rankingW2A2[i*len(hw_classifier.classes) + 1] > 0 and rankingW2A2[i*len(hw_classifier.classes)] < 0:
            if rankingW2A2[i*len(hw_classifier.classes) + 1] > rankingW2A2[i*len(hw_classifier.classes)] :
#             if rankingW2A2[i*len(hw_classifier.classes)+1] >= thresh_hold:
#             if rankingW2A2[i] == 1:
                frame_res[i] = 1
            else:
                frame_res[i] = 0
            
#             if diff_status[i] == 0:    
#                 if status[i] != frame_res[i]:
#                     diff_status[i] = 1
#                 pre_frame_res[i] = frame_res[i]
#             else:
#                 diff_status[i] += 1
#                 if diff_status[i] == diff_interval:
#                     if frame_res[i] == pre_frame_res[i]:
#                         status[i] = frame_res[i]
#                     diff_status[i] = 0
#                     pre_frame_res[i] = frame_res[i]
            
            startX, startY, width, height = data[i]['point_array']
            
            font = cv2.FONT_HERSHEY_SIMPLEX
            # fontScale
            fontScale = 1
            # Line thickness 
            thickness = 5
            if frame_res[i] == 1:
#                 print("{: >8}{: >3} ".format("[Slot ID]", slot_id[i]))
#                 cv2.circle(origin, (int(startX + width/2), int(startY + height/2)), 10, (0,0,255), -1)
                cv2.rectangle(origin, (startX, startY), (startX+width, startY+height), (0,0,255), 5)
                origin = cv2.putText(origin, str(slot_id[i]), (int(startX + width/2), int(startY + height/2)), font, fontScale, (0,0,255), thickness, cv2.LINE_AA)
            else:
#                 cv2.circle(origin, (int(startX + width/2), int(startY + height/2)), 10, (0,255,0), -1)
                cv2.rectangle(origin, (startX, startY), (startX+width, startY+height), (0,255,0), 5)
                origin = cv2.putText(origin, str(slot_id[i]), (int(startX + width/2), int(startY + height/2)), font, fontScale, (0,255,0), thickness, cv2.LINE_AA)
                
        path = './segment/frame' + str(counter) + '.jpg'
#         path = './segment/video.jpg'
        cv2.imwrite(path, origin)
#         img = cv2.imread(path)
#         out.write(img)

        print(counter)
#         print(pre_frame_res)
        print(frame_res)
#         print(diff_status)
        print(status)

        end2 = time.time()
#         print("End time: {:.2f}".format(end2))
        print("FPS: {:.2f}\n".format( 1/(end2-start)))
    
    else:
        video.release()
#         out.release()
        break
        
print("\nDetection ends\n")


def convert_frames_to_video(pathIn,pathOut,fps):
    frame_array = []
    files = [f for f in os.listdir(pathIn) if os.path.isfile(os.path.join(pathIn, f))]
    #for sorting the file names properly
    files.sort(key = lambda x: int(x[5:-4]))
    filename=pathIn + files[0]
    img = cv2.imread(filename)
    height, width, layers = img.shape
    size = (width,height)
    out = cv2.VideoWriter(pathOut,cv2.VideoWriter_fourcc(*'DIVX'), fps, size)
    print("Start wrting video...")
    for i in range(len(files)):
        filename=pathIn + files[i]
        #reading each files
        img = cv2.imread(filename)
        height, width, layers = img.shape
#         print(filename)
        #inserting the frames into an image array
        frame_array.append(img)
        if (len(frame_array) % 100 == 0):
            print(filename)
            for i in range(len(frame_array)):
                # writing to a image array
                out.write(frame_array[i])
            frame_array = []
    for i in range(len(frame_array)):
        # writing to a image array
        out.write(frame_array[i])
    out.release()
    print("Video DONE!!!")

pathIn= './segment/'
pathOut = 'output_'+ video_name
fps = 25.0
convert_frames_to_video(pathIn, pathOut, fps)
        
xlnk = Xlnk()
xlnk.xlnk_reset()
